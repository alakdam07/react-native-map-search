export const GOOGLE_MAPS_APIKEY = `AIzaSyC7VSCNVvqxfNhbsvCadl4FoxDyZ35c-wo`;

export const filterPropertiesInRegion = (region, properties) => {
  // Remove any properties that are not within the specified region

  // get the outer edges of the region
  const boundingBox = {
    "bottomLeftLng": region.longitude - region.longitudeDelta / 2,
    "bottomLeftLat": region.latitude - region.latitudeDelta / 2,
    "topRightLng": region.longitude + region.longitudeDelta / 2,
    "topRightLat": region.latitude + region.latitudeDelta / 2,
    "bottomRightLng": region.longitude + region.longitudeDelta / 2,
    "bottomRightLat": region.latitude - region.latitudeDelta / 2,
    "topLeftLng": region.longitude - region.longitudeDelta / 2,
    "topLeftLat": region.latitude + region.latitudeDelta / 2
  };

  const isInRegion = (property) => {
    // return true if the property falls within the outer edges of the bounding box
    const { "lng": longitude, "lat": latitude } = property?.location || {};
    return latitude > boundingBox.bottomLeftLat &&
      latitude < boundingBox.topRightLat &&
      longitude > boundingBox.bottomLeftLng &&
      longitude < boundingBox.topRightLng;
  };

  return properties.filter((i) => isInRegion(i));
};

