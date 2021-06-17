import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import * as fromPageState from './page-state.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface AppState {
  pageState: fromPageState.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  pageState: fromPageState.reducer,
  router: routerReducer,
};

export const getRootState = (state: AppState) => state;
export const getRouterState = (state: AppState) => state.router;

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
