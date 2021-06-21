export function getMapPinsFromListingRecords(records) {
  const markers = records.map((record) => {
    return {
      id: record?.propertyID,
      favorite: record?.favorite,
      name: record?.name,
      city: record?.city,
      streetAddress: record?.streetAddress,
      coordinates: [
        parseFloat(record?.geocode?.Longitude),
        parseFloat(record?.geocode?.Latitude),
      ],
    };
  });
  return markers;
}

export function resetMapPinsInformation(recordsEntities) {
  const records = Object.values(recordsEntities) || [];
  const markers = getMapPinsFromListingRecords(records);
  return markers;
}

export function getMapPinFromPropertyInfo(propertyInfo) {
  const marker = [propertyInfo].map((record) => {
    return {
      id: record?.propertyID,
      favorite: record?.favorite,
      name: record?.name,
      city: record?.city,
      streetAddress: record?.streetAddress,
      coordinates: [
        parseFloat(record?.geocode?.Longitude),
        parseFloat(record?.geocode?.Latitude),
      ],
    };
  });
  return marker;
}
