import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PageState } from '../models/page-state.model';
import * as PageStateActions from '../actions/page-state.actions';

export const pageStatesFeatureKey = 'pageStates';

export interface State extends EntityState<PageState> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PageState> = createEntityAdapter<
  PageState
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PageStateActions.addPageState, (state, action) =>
    adapter.addOne(action.pageState, state)
  ),
  on(PageStateActions.upsertPageState, (state, action) =>
    adapter.upsertOne(action.pageState, state)
  ),
  on(PageStateActions.addPageStates, (state, action) =>
    adapter.addMany(action.pageStates, state)
  ),
  on(PageStateActions.upsertPageStates, (state, action) =>
    adapter.upsertMany(action.pageStates, state)
  ),
  on(PageStateActions.updatePageState, (state, action) =>
    adapter.updateOne(action.pageState, state)
  ),
  on(PageStateActions.updatePageStates, (state, action) =>
    adapter.updateMany(action.pageStates, state)
  ),
  on(PageStateActions.deletePageState, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PageStateActions.deletePageStates, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(PageStateActions.loadPageStates, (state, action) =>
    adapter.setAll(action.pageStates, state)
  ),
  on(PageStateActions.clearPageStates, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
