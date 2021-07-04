import { createSelector } from '@ngrx/store';
import { getRootState, AppState } from '../reducers';
import {
  getCurrentDeviceState,
  getNotificationState,
  getNotificationStatusState,
  getApartmentListingsLoadingState,
  getAllApartmentListingDataState,
  getAgentInfoState,
  getPropertyInfoState,
  getPropertyInfoLoadingState,
  getMapPinstate,
} from '../reducers/page-state.reducer';

export const getPageState = createSelector(
  getRootState,
  (state: AppState) => state.pageState
);

export const getCurrentDevice = createSelector(
  getPageState,
  getCurrentDeviceState
);

export const getNotification = createSelector(
  getPageState,
  getNotificationState
);

export const getNotificationStatus = createSelector(
  getPageState,
  getNotificationStatusState
);

export const getApartmentListingsLoading = createSelector(
  getPageState,
  getApartmentListingsLoadingState
);

export const getApartmentListingData = createSelector(
  getPageState,
  getAllApartmentListingDataState
);

export const getAgentInfo = createSelector(getPageState, getAgentInfoState);

export const getPropertyInfo = createSelector(
  getPageState,
  getPropertyInfoState
);

export const getPropertyInfoLoading = createSelector(
  getPageState,
  getPropertyInfoLoadingState
);

export const getMapPins = createSelector(getPageState, getMapPinstate);
