import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import {
  getCurrentDevice,
  getPropertyInfo,
  getPropertyInfoLoading,
} from '../../../../store/selectors/page-state.selectors';
import {
  loadPropertyInfo,
  resetMapPins,
  updatePropertyInfoFavorite,
} from '../../../../store/actions/page-state.actions';

@Component({
  selector: 'app-apartment-listing-page',
  templateUrl: './apartment-listing-page.component.html',
  styleUrls: ['./apartment-listing-page.component.css'],
})
export class ApartmentListingPageComponent implements OnInit {
  currentDevice$: Observable<string>;
  property$: Observable<any>;
  propertyInfoLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.currentDevice$ = this.store.select(getCurrentDevice);
    this.property$ = this.store.select(getPropertyInfo);
    this.propertyInfoLoading$ = this.store.select(getPropertyInfoLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadPropertyInfo());
  }

  backToListings(e) {
    this.store.dispatch(resetMapPins());
  }

  updatePropertyFavorite() {
    this.store.dispatch(updatePropertyInfoFavorite());
  }
}
