import { expect } from 'chai';
import {
  getMapPinsFromListingRecords,
  resetMapPinsInformation,
  getMapPinFromPropertyInfo,
} from '../../../src/app/shared/helpers';
import {
  testRecord,
  testStoreEntities,
  testRecords,
} from '../constants/test.constants';

describe('Check Map Pins from Geocode', () => {
  it('checks property geoCode are captured for map pins', () => {
    const records = testRecords;
    const mapPins = getMapPinsFromListingRecords(records);
    expect(mapPins[0].coordinates[0]).to.equal(
      parseFloat(records[0].geocode.Longitude)
    );
  });
});

describe('Check Map Pins Having Property ID', () => {
  it('checks map pins having property ID', () => {
    const records = testRecords;
    const mapPins = getMapPinsFromListingRecords(records);
    expect(mapPins[0].id).to.equal(records[0].propertyID);
  });
});

describe('Reset Map Pins From Store Entities', () => {
  it('generate map pins from store entities', () => {
    const storeEntities = testStoreEntities;
    const mapPins = resetMapPinsInformation(storeEntities);
    expect(mapPins[0].id).to.equal(storeEntities[74015].propertyID);
  });
});

describe('Generate Map Pin From Property Information', () => {
  it('generate map pin from property information', () => {
    const record = testRecord;
    const mapPins = getMapPinFromPropertyInfo(record);
    expect(mapPins[0].id).to.equal(record.propertyID);
  });
});
