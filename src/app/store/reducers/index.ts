import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { State, reducer } from './page-state.reducer';

export interface AppState {
  pageState: State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  pageState: reducer,
  router: routerReducer,
};

export const getRootState = (state: AppState) => state;
export const getRouterState = (state: AppState) => state.router;

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
