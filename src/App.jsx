import { useEffect, useState } from "react";
import { getUserLocation, getPharmacy } from "./services/api";
import Card from "./components/Card";
import Header from "./components/Header";
import infinityGif from "./assets/infinity.gif";

function App() {
  const [pharmacys, setPharmacys] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestPharmacy, setNearestPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);

  const findNearest = () => {
    let minDist = Infinity;
    let nearestPharmacy = null;

    pharmacys.forEach((pharmacy) => {
      const pharmacyLoc = pharmacy.loc.split(",");
      const dist = haversine(
        userLocation.lat,
        userLocation.lon,
        pharmacyLoc[0],
        pharmacyLoc[1]
      );
      if (dist < minDist) {
        minDist = dist;
        nearestPharmacy = pharmacy;
      }
    });

    setNearestPharmacy(nearestPharmacy);
    setLoading(false);
  };

  useEffect(() => {
    triggerPharmacy();
  }, []);

  useEffect(() => {
    if (pharmacys.length && userLocation) {
      findNearest();
    }
  }, [pharmacys, userLocation]);

  const haversine = (currLat, currLon, lat2, lon2) => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = deg2rad(lat2 - currLat);
    const dLon = deg2rad(lon2 - currLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(currLat)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const triggerPharmacy = async () => {
    const userResult = await getUserLocation();
    setUserLocation(userResult);
    const results = await getPharmacy(userResult.city, userResult.district);
    setPharmacys(results);
  };

  return (
    <>
      <Header />
      {loading && (
        <div className="loading-place">
          <div className="gif-wrapper">
            <img src={infinityGif}></img>
          </div>
        </div>
      )}
      {!loading && (
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
