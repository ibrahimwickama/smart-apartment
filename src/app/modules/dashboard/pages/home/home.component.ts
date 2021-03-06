import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import {
  getCurrentDevice,
  getApartmentListingsLoading,
  getPropertyInfoLoading,
} from '../../../../store/selectors/page-state.selectors';
import { getRouterParamsState } from '../../../../store/selectors/router.selectors';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentDevice$: Observable<string>;
  routerParams$: Observable<any>;
  apartmentListingsLoading$: Observable<boolean>;
  propertyInfoLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.currentDevice$ = this.store.select(getCurrentDevice);
    this.routerParams$ = this.store.select(getRouterParamsState);
    this.apartmentListingsLoading$ = this.store.select(
      getApartmentListingsLoading
    );
    this.propertyInfoLoading$ = this.store.select(getPropertyInfoLoading);
  }

  ngOnInit() {}
}
