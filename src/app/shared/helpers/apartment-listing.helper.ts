import { removeDuplicates } from './shared.helper';
import { getMapPinsFromListingRecords } from './map.helper';

export function sanitizeApartmentListingPayload(listingRecords) {
  const updatedListingRecords = (listingRecords || []).map((item) => ({
    ...item,
    id: item.propertyID,
  }));
  return updatedListingRecords;
}

export function filterApartmentsListingFromFilterselections(
  records,
  filterSelections
) {
  let filteredListings = [];
  // filter by rent
  if (filterSelections.rent) {
    (records || []).forEach((record) => {
      if (
        record?.floorplans.some((plan) => filterSelections.rent >= plan?.price)
      ) {
        filteredListings.push(record);
      }
    });
  }

  // filter by favorite
  if (filterSelections.favoriteProperties) {
    const filteredrecords = records.filter((record) => record.favorite);
    filteredListings = filteredListings.concat(filteredrecords);
  }

  // filtee by bedrooms
  (records || []).forEach((record) => {
    if (
      record?.floorplans.some(
        (plan) =>
          (filterSelections?.bedrooms === 0 &&
            filterSelections?.bedrooms?.studio) ||
          (filterSelections?.bedrooms === 1 &&
            filterSelections?.bedrooms?.bed1) ||
          (filterSelections?.bedrooms === 2 &&
            filterSelections?.bedrooms?.bed2) ||
          (filterSelections?.bedrooms === 3 && filterSelections?.bedrooms?.bed3)
      )
    ) {
      filteredListings.push(record);
    }
  });

  // now remove duplicates
  const targetedListings = removeDuplicates(filteredListings, 'propertyID');
  const mapPins = getMapPinsFromListingRecords(targetedListings);
  return mapPins;
}
