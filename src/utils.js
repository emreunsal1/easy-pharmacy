const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const haversine = (currLat, currLon, lat2, lon2) => {
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