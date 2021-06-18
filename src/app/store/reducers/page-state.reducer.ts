import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PageState, NotificationPayload, AgentInfo } from '../models';
import * as PageStateActions from '../actions/page-state.actions';
import { sanitizeApartmentListingPayload } from 'src/app/shared/helpers';

export const pageStatesFeatureKey = 'pageStates';

export interface State extends EntityState<PageState> {
  // additional entities state properties
  currentDevice: string;
  notification: NotificationPayload;
  notificationStatus: boolean;
  agentInfo: AgentInfo;
}

export const adapter: EntityAdapter<PageState> = createEntityAdapter<
  PageState
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentDevice: '',
  notification: { message: '', statusCode: 0 },
  notificationStatus: false,
  agentInfo: {
    firstname: '',
    lastname: '',
    company: '',
    splashMessage: '',
    customHeader: '',
  },
});

export const reducer = createReducer(
  initialState,
  on(PageStateActions.loadCurrentDevice, (state, action) => ({
    ...state,
    currentDevice: action.payload,
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
  on(PageStateActions.addAgentListing, (state, action) =>
    adapter.addMany(sanitizeApartmentListingPayload(action.payload.records), {
      ...state,
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
export const getNotificationStatusState = (state: State) =>
  state.notificationStatus;
