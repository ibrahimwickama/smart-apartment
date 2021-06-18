import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import * as fromSelectors from '../../../../store/selectors';
import * as fromActions from '../../../../store/actions';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-apartment-listing-page',
  templateUrl: './apartment-listing-page.component.html',
  styleUrls: ['./apartment-listing-page.component.css'],
})
export class ApartmentListingPageComponent implements OnInit {
  property$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.property$ = this.store.select(fromSelectors.getPropertyInfo);
  }

  ngOnInit() {
    this.store.dispatch(fromActions.loadPropertyInfo());
  }
}
