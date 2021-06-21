export const testRecord = {
  listID: 5363950,
  order: 0,
  propertyID: 74015,
  name: 'Listing #74015',
  streetAddress: 'Riveroad Ct',
  favorite: true,
  geocode: {
    Longitude: '-97.422',
    Latitude: '32.7009',
    Percision: 'ROOFTOP',
    IsValid: true,
  },
};

export const testRecords = [
  testRecord,
  {
    listID: 2839283,
    order: 0,
    propertyID: 824982,
    name: 'Listing #74015',
    streetAddress: 'Riveroad Ct',
    geocode: {
      Longitude: '-97.422',
      Latitude: '32.7009',
      Percision: 'ROOFTOP',
      IsValid: true,
    },
  },
];

export const testStoreEntities = {
  [testRecord.propertyID]: testRecord,
};
