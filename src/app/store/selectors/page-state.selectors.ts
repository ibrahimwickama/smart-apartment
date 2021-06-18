import { createSelector } from '@ngrx/store';
import * as fromMainReducer from '../reducers';
import * as fromPageStateReducer from '../reducers/page-state.reducer';

export const getPageState = createSelector(
  fromMainReducer.getRootState,
  (state: fromMainReducer.AppState) => state.pageState
);

export const getCurrentDevice = createSelector(
  getPageState,
  fromPageStateReducer.getCurrentDeviceState
);

export const getNotification = createSelector(
  getPageState,
  fromPageStateReducer.getNotificationState
);

export const getNotificationStatus = createSelector(
  getPageState,
  fromPageStateReducer.getNotificationStatusState
);

export const getApartmentListingsLoading = createSelector(
  getPageState,
  fromPageStateReducer.getApartmentListingsLoadingState
);

export const getApartmentListingData = createSelector(
  getPageState,
  fromPageStateReducer.getAllApartmentListingDataState
);
