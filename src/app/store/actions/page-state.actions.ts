import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PageState, NotificationPayload, AgentListing } from '../models';

export const loadApartmentListings = createAction(
  '[PageState/API] Load Apartments Listings'
);

export const addAgentListing = createAction(
  '[PageState/API] Add Agent Listings',
  props<{ payload: AgentListing }>()
);
export const updateNotification = createAction(
  '[PageState/API] Update Notification',
  props<{ payload: NotificationPayload }>()
);

export const updateNotificationStatus = createAction(
  '[PageState/API] Update Notification Status',
  props<{ payload: boolean }>()
);

export const loadCurrentDevice = createAction(
  '[PageState/API] Load Current Device',
  props<{ payload: string }>()
);

export const clearPageStates = createAction('[PageState/API] Clear PageStates');
