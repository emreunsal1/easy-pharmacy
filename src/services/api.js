import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const { city, district } = await getUserAddress(
              latitude,
              longitude
            );
            resolve({ lat: latitude, lon: longitude, city, district });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getUserAddress = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  const response = await axios.get(url);
  const { address } = response.data;
  return { city: address.province, district: address.town };
};

getUserLocation().catch((error) => {
  console.error("Error getting user location:", error);
});

export const getPharmacy = async (city, district) => {
  const convertCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, 'i');
  const convertDistrict = district.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, 'i');
  const response = await axios.get(`${apiUrl}/pharmacies-on-duty?city=${convertCity}&district=${convertDistrict}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = response.data.data;
  return data;
};

