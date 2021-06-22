import { removeDuplicates } from './shared.helper';
import {
  getMapPinsFromListingRecords,
  resetMapPinsInformation,
} from './map.helper';

export function sanitizeApartmentListingPayload(listingRecords) {
  const updatedListingRecords = (listingRecords || []).map((item) => ({
    ...item,
    id: item.propertyID,
  }));
  return updatedListingRecords;
}

export function filterApartmentsListingFromFilterselections(
  recordsEntities,
  filterSelections
) {
  const records: any = Object.values(recordsEntities) || [];
  let filteredListings = records;

  // filter by favorite
  filteredListings = filteredListings.filter(
    (record) => record.favorite === filterSelections.favoriteProperties
  );

  // filter by rent
  filteredListings = (filteredListings || []).filter((record) =>
    (record?.floorplans || []).some(
      (plan) => filterSelections.rent >= plan?.price
    )
  );

  // filter by bedrooms
  filteredListings = (filteredListings || []).filter((record) =>
    (record?.floorplans || []).some(
      (plan) =>
        (plan?.bedrooms === 0 && filterSelections?.bedrooms?.studio) ||
        (plan?.bedrooms === 1 && filterSelections?.bedrooms?.bed1) ||
        (plan?.bedrooms === 2 && filterSelections?.bedrooms?.bed2) ||
        (plan?.bedrooms === 3 && filterSelections?.bedrooms?.bed3)
    )
  );

  // now remove duplicates
  const targetedListings = removeDuplicates(filteredListings, 'propertyID');
  const mapPins = getMapPinsFromListingRecords(targetedListings);
  return mapPins;
}
