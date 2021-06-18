export interface PageState {
  id: string;
}

export interface NotificationPayload {
  message: string;
  statusCode: number;
}

export interface AgentInfo {
  firstname: string;
  lastname: string;
  company: string;
  splashMessage: string;
  customHeader: string;
}

export interface ApartmentRecord {
  id: number;
  listID: number;
  order: number;
  propertyID: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  pets: boolean;
  washerDry: string;
  photo: string;
  favorite: boolean;
  highestSentCommissions: number;
  onsiteManager?: null;
  management?: null;
  proximity: number;
  section8: boolean;
  seniorHousing: boolean;
  studentHousting: boolean;
  floorplans?: FloorplansEntity[] | null;
  highValueAmenities?: string[] | null;
  paidUtilities?: null[] | null;
  geocode: Geocode;
}
export interface FloorplansEntity {
  bedrooms: number;
  type: string;
  price: number;
}
export interface Geocode {
  Longitude: string;
  Latitude: string;
  Percision: string;
  IsValid: boolean;
}

export interface AgentListing {
  agentInfo: AgentInfo;
  records: ApartmentRecord[];
}

export interface PropertyInfo {
  listID: number;
  propertyID: number;
  yearBuilt: number;
  yearRenovated: number;
  name: string;
  streetAddress: string;
  neighborhood: string;
  phone: string;
  city: string;
  adminFee: number;
  appFee: number;
  url: string;
  favorite: boolean;
  notes: string;
  specials: string;
  parking: Parking;
  schoolsInfo: SchoolsInfo;
  petInfo: PetInfo;
  paidUtilities?: null[] | null;
  floorplans?: FloorplansEntity[] | null;
  highValueAmenities?: string[] | null;
  unitAmenities?: string[] | null;
  propertyAmenities?: string[] | null;
  geocode: Geocode;
  photos?: string[] | null;
  section8: boolean;
  studentHousting: boolean;
  seniorHousing: boolean;
  officeHours?: null;
  numUnits: number;
  email?: null;
  role: string;
  management?: null;
  managementOffices?: null[] | null;
  regionalName?: null;
  regionalPhone?: null;
  regionalEmail?: null;
  onsiteManager?: null;
}
export interface Parking {
  propertyID: number;
  reserved: boolean;
  reservedFeeMin: number;
  reservedFeeMax: number;
  covered: boolean;
  coveredFeeMin: number;
  coveredFeeMax: number;
  garage: boolean;
  garageFeeMin: number;
  garageFeeMax: number;
  detached: boolean;
  detachedFeeMin: number;
  detachedFeeMax: number;
  breezeway: boolean;
  attached: boolean;
}
export interface SchoolsInfo {
  propertyID: number;
  district: string;
  elementry: string;
  intermediate: string;
  middle: string;
  high: string;
}
export interface PetInfo {
  allowed: boolean;
  extraRent: number;
  limit: number;
  weight: number;
  breedRestriction: boolean;
  nonRefundableFee: number;
}
export interface FloorplansEntity {
  floorplanID: number;
  bed: number;
  bath: number;
  sqft: number;
  deposit: number;
  photoUrl: string;
  washerDryer: string;
  price: number;
  priceMax: number;
  den: boolean;
  isAvailable: boolean;
  available: string;
  comments: string;
}
