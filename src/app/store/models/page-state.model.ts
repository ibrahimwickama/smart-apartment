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
  records: Array<ApartmentRecord>;
}
