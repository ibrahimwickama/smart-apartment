import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromActions from '../actions';
import { AppService } from '../../shared/services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PageStateEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private appService: AppService
  ) {}

  loadApartmentListings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadApartmentListings),
        switchMap((action) =>
          this.appService.fetchListings().pipe(
            map((response: any) =>
              this.store.dispatch(
                fromActions.addAgentListing({
                  payload: response ? response : { agentInfo: {}, records: [] },
                })
              )
            ),
            catchError((error: Error) =>
              of(
                console.log(error),
                this.store.dispatch(
                  fromActions.updateNotification({
                    payload: {
                      message: error.message,
                      statusCode: error['status'],
                    },
                  })
                )
              )
            )
          )
        )
      ),
    { dispatch: false }
  );
}
