import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  PageState,
  NotificationPayload,
  AgentInfo,
  PropertyInfo,
} from '../models/page-state.model';
import {
  sanitizeApartmentListingPayload,
  filterApartmentsListingFromFilterselections,
} from '../../shared/helpers/apartment-listing.helper';

import {
  addAgentListings,
  loadCurrentDevice,
  loadApartmentListings,
  loadPropertyInfo,
  updateNotification,
  updateNotificationStatus,
  updateMapPinsFromFilters,
  resetMapPins,
  updateCurrentPropertyInfo,
  updatePropertyInfoFavorite,
} from '../actions/page-state.actions';
import {
  resetMapPinsInformation,
  getMapPinFromPropertyInfo,
  getMapPinsFromListingRecords,
} from '../../shared/helpers/map.helper';

export const pageStatesFeatureKey = 'pageStates';

export interface State extends EntityState<PageState> {
  // additional entities state properties
  currentDevice: string;
  loadingApartmentListings: boolean;
  notification: NotificationPayload;
  notificationStatus: boolean;
  agentInfo: AgentInfo;
  currentViewedProperty: any;
  loadingPropertyInfo: boolean;
  mapPins: any;
}

export const adapter: EntityAdapter<PageState> = createEntityAdapter<
  PageState
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentDevice: '',
  loadingApartmentListings: false,
  notification: { message: '', statusCode: 0 },
  notificationStatus: false,
  agentInfo: {
    firstname: '',
    lastname: '',
    company: '',
    splashMessage: '',
    customHeader: '',
  },
  currentViewedProperty: {},
  loadingPropertyInfo: false,
  mapPins: [],
});

export const reducer = createReducer(
  initialState,
  on(loadCurrentDevice, (state, action) => ({
    ...state,
    currentDevice: action.payload,
  })),
  on(loadApartmentListings, (state, action) => ({
    ...state,
    loadingApartmentListings: true,
  })),
  on(loadPropertyInfo, (state, action) => ({
    ...state,
    loadingPropertyInfo: true,
  })),
  on(updateNotification, (state, action) => ({
    ...state,
    notification: action.payload,
    notificationStatus: true,
  })),
  on(updateNotificationStatus, (state, action) => ({
    ...state,
    notificationStatus: action.payload,
  })),
  on(updateMapPinsFromFilters, (state, action) => ({
    ...state,
    mapPins: filterApartmentsListingFromFilterselections(
      state.entities,
      action.payload
    ),
  })),
  on(resetMapPins, (state, action) => ({
    ...state,
    mapPins: resetMapPinsInformation(state.entities),
  })),
  on(updateCurrentPropertyInfo, (state, action) => ({
    ...state,
    currentViewedProperty: action.payload,
    mapPins: getMapPinFromPropertyInfo(action.payload),
    loadingPropertyInfo: false,
  })),
  on(updatePropertyInfoFavorite, (state, action) => ({
    ...state,
    mapPins: [
      {
        ...state.mapPins[0],
        favorite: !state.mapPins[0].favorite,
      },
    ],
    currentViewedProperty: {
      ...state.currentViewedProperty,
      favorite: !state.currentViewedProperty.favorite,
    },
    entities: {
      ...state.entities,
      [state.currentViewedProperty.propertyID]: {
        ...state.entities[state.currentViewedProperty.propertyID],
        favorite: !state?.currentViewedProperty?.favorite,
      },
    },
  })),
  on(addAgentListings, (state, action) =>
    adapter.addMany(sanitizeApartmentListingPayload(action.payload.records), {
      ...state,
      mapPins: getMapPinsFromListingRecords(action.payload.records),
      loadingApartmentListings: false,
      agentInfo: action.payload.agentInfo,
    })
  )
);

export const {
  selectIds: getApartmentListingIdsState,
  selectEntities: getApartmentListingEntitiesState,
  selectAll: getAllApartmentListingDataState,
  selectTotal,
} = adapter.getSelectors();

export const getCurrentDeviceState = (state: State) => state.currentDevice;
export const getNotificationState = (state: State) => state.notification;
export const getApartmentListingsLoadingState = (state: State) =>
  state.loadingApartmentListings;
export const getNotificationStatusState = (state: State) =>
  state.notificationStatus;
export const getMapPinstate = (state: State) => state.mapPins;
export const getAgentInfoState = (state: State) => state.agentInfo;
export const getPropertyInfoState = (state: State) =>
  state.currentViewedProperty;
export const getPropertyInfoLoadingState = (state: State) =>
  state.loadingPropertyInfo;
