import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import * as fromSelectors from '../../../../store/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css'],
})
export class AgentPageComponent implements OnInit {
  apartmentListing$: Observable<any>;
  apartmentListingsLoading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.apartmentListingsLoading$ = this.store.select(
      fromSelectors.getApartmentListingsLoading
    );
    this.apartmentListing$ = this.store.select(
      fromSelectors.getApartmentListingData
    );
  }

  ngOnInit() {}

  trackByFn(index, item) {
    return item.id;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
