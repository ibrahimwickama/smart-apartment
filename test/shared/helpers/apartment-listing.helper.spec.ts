import { expect } from 'chai';
import { sanitizeApartmentListingPayload } from '../../../src/app/shared/helpers';
import { testRecords } from '../constants/test.constants';

describe('Check Record Listing With Additional ID', () => {
  it('checks if properties records have additional id property', () => {
    const records = testRecords;
    const updatedRecords = sanitizeApartmentListingPayload(records);
    expect(records[0].propertyID).to.equal(updatedRecords[0].id);
  });
});
