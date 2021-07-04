import { createSelector } from '@ngrx/store';
import { getSelectors } from '@ngrx/router-store';
import { getRootState, AppState, getRouterState } from '../reducers';

export const getRouter = createSelector(
  getRootState,
  (state: AppState) => state.router
);

const {
  selectQueryParams: getQueryParams, // select the current route query params
  selectRouteParams: getRouteParams, // select the current route params
  selectRouteData: getRouteData, // select the current route data
  selectUrl: getUrl, // select the current url
} = getSelectors(getRouterState);

export const getRouterParamsState = createSelector(
  getRouter,
  (routeState: any) => {
    return routeState?.state?.queryParams || {};
  }
);

export const getRouterUrl = createSelector(getRouterState, (routeState) =>
  routeState && routeState?.state && routeState?.state?.url
    ? routeState?.state?.url.split('?')[0]
    : ''
);
