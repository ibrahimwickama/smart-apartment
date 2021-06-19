import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import { AppService } from '../../shared/services';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
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
                fromActions.addAgentListings({
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

  loadPropertyInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadPropertyInfo),
        withLatestFrom(this.store.select(fromSelectors.getRouterParamsState)),
        switchMap(([action, routerParams]: [any, any]) =>
          this.appService
            .fetchPropertyInformation(routerParams?.propertyid)
            .pipe(
              map((response: any) =>
                this.store.dispatch(
                  fromActions.updateCurrentPropertyInfo({
                    payload: response,
                  })
                )
              ),
              catchError((error: Error) =>
                of(
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
      ),
    { dispatch: false }
  );
}
