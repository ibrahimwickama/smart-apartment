import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  PageState,
  NotificationPayload,
  AgentInfo,
  PropertyInfo,
} from '../models';
import * as PageStateActions from '../actions/page-state.actions';
import { sanitizeApartmentListingPayload } from 'src/app/shared/helpers';

export const pageStatesFeatureKey = 'pageStates';

export interface State extends EntityState<PageState> {
  // additional entities state properties
  currentDevice: string;
  loadingApartmentListings: boolean;
  notification: NotificationPayload;
  notificationStatus: boolean;
  agentInfo: AgentInfo;
  currentViewedProperty: {};
  loadingPropertyInfo: boolean;
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
});

export const reducer = createReducer(
  initialState,
  on(PageStateActions.loadCurrentDevice, (state, action) => ({
    ...state,
    currentDevice: action.payload,
  })),
  on(PageStateActions.loadApartmentListings, (state, action) => ({
    ...state,
    loadingApartmentListings: true,
  })),
  on(PageStateActions.loadPropertyInfo, (state, action) => ({
    ...state,
    loadingPropertyInfo: true,
  })),
  on(PageStateActions.updateNotification, (state, action) => ({
    ...state,
    notification: action.payload,
    notificationStatus: true,
  })),
  on(PageStateActions.updateNotificationStatus, (state, action) => ({
    ...state,
    notificationStatus: action.payload,
  })),
  on(PageStateActions.updateCurrentPropertyInfo, (state, action) => ({
    ...state,
    currentViewedProperty: action.payload,
    loadingPropertyInfo: false,
  })),
  on(PageStateActions.addAgentListings, (state, action) =>
    adapter.addMany(sanitizeApartmentListingPayload(action.payload.records), {
      ...state,
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
export const getAgentInfoState = (state: State) => state.agentInfo;
export const getPropertyInfoState = (state: State) =>
  state.currentViewedProperty;
export const getPropertyInfoLoadingState = (state: State) =>
  state.loadingPropertyInfo;
