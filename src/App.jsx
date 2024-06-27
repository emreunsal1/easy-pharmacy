import { useEffect, useState } from "react";
import { getUserLocation, getPharmacy } from "./services/api";
import Card from "./components/Card";
import Header from "./components/Header";
import infinityGif from "./assets/infinity.gif";
import information from './assets/information.png';
import { haversine } from "./utils";

function App() {
  const [pharmacys, setPharmacys] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const findNearest = () => {
    if (!pharmacys.length || !userLocation) {
      return null;
    }
    let minDist = Infinity;
    let nearestPharmacy = null; //düzenle

    pharmacys.forEach((pharmacy) => {
      const dist = haversine(
        userLocation.lat,
        userLocation.lon,
        pharmacy.latitude,
        pharmacy.longitude
      );
      if (dist < minDist) {
        minDist = dist;
        nearestPharmacy = pharmacy;
      }
    });
    return nearestPharmacy;
  };
  const nearestPharmacy = findNearest();

  useEffect(() => {
    triggerPharmacy();
  }, []);


  

  const triggerPharmacy = async () => {
    try {
      const userResult = await getUserLocation();
      setUserLocation(userResult);
      const results = await getPharmacy('İzmir','Karşıyaka');
      setPharmacys(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  return (
    <>
      
      {!loading && !userLocation && (
        <div className="info-popup">
          <div className="info-popup-container">
            <div className="icon-wrapper">
              <img src={information}></img>
            </div>
            <div className="message">Lütfen ayarlardan konumu açınız ve sayfayı yenileyiniz.</div>
            <div className="okay-button" onClick={() => location.reload()}>Tamam</div>
          </div>
        </div>
       )} 
      <Header />
      {loading && (
        <div className="loading-place">
          <div className="gif-wrapper">
            <img src={infinityGif}></img>
          </div>
        </div>
      )}
      {pharmacys.length > 0 && (
        <div className="container">
          <div className="nearest-pharmacy">
            <div className="title">Size En Yakın Nöbetçi Eczane</div>
            <Card data={nearestPharmacy} />
          </div>
          <div className="pharmacy-list">
            <div className="title"> Diğer Nöbetçi Eczaneler </div>
            {pharmacys.map((pharmacy, index) => (
              <Card key={index} data={pharmacy} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
