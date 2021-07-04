import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AppService } from '../../shared/services';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadApartmentListings,
  addAgentListings,
  updateNotification,
  loadPropertyInfo,
  updateCurrentPropertyInfo,
} from '../actions/page-state.actions';
import { getRouterParamsState } from '../selectors/router.selectors';

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
        ofType(loadApartmentListings),
        switchMap((action) =>
          this.appService.fetchListings().pipe(
            map((response: any) =>
              this.store.dispatch(
                addAgentListings({
                  payload: response ? response : { agentInfo: {}, records: [] },
                })
              )
            ),
            catchError((error: Error) =>
              of(
                this.store.dispatch(
                  updateNotification({
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
        ofType(loadPropertyInfo),
        withLatestFrom(this.store.select(getRouterParamsState)),
        switchMap(([action, routerParams]: [any, any]) =>
          this.appService
            .fetchPropertyInformation(routerParams?.propertyid)
            .pipe(
              map((response: any) =>
                this.store.dispatch(
                  updateCurrentPropertyInfo({
                    payload: response,
                  })
                )
              ),
              catchError((error: Error) =>
                of(
                  updateNotification({
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
