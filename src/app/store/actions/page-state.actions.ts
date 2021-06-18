import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PageState } from '../models/page-state.model';

export const loadPageStates = createAction(
  '[PageState/API] Load PageStates',
  props<{ pageStates: PageState[] }>()
);

export const addPageState = createAction(
  '[PageState/API] Add PageState',
  props<{ pageState: PageState }>()
);

export const upsertPageState = createAction(
  '[PageState/API] Upsert PageState',
  props<{ pageState: PageState }>()
);

export const addPageStates = createAction(
  '[PageState/API] Add PageStates',
  props<{ pageStates: PageState[] }>()
);

export const upsertPageStates = createAction(
  '[PageState/API] Upsert PageStates',
  props<{ pageStates: PageState[] }>()
);

export const updatePageState = createAction(
  '[PageState/API] Update PageState',
  props<{ pageState: Update<PageState> }>()
);

export const updatePageStates = createAction(
  '[PageState/API] Update PageStates',
  props<{ pageStates: Update<PageState>[] }>()
);

export const deletePageState = createAction(
  '[PageState/API] Delete PageState',
  props<{ id: string }>()
);

export const loadCurrentDevice = createAction(
  "[PageState/API] Load Current Device",
  props<{ payload: string }>()
);

export const clearPageStates = createAction('[PageState/API] Clear PageStates');
