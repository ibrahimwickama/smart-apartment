export function sanitizeApartmentListingPayload(listingRecords) {
  const updatedListingRecords = (listingRecords || []).map((item) => ({
    ...item,
    id: item.propertyID,
  }));
  return updatedListingRecords;
}
