import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import * as fromSelectors from '../../../../store/selectors';
import { Store } from '@ngrx/store';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css'],
})
export class AgentPageComponent implements OnInit {
  apartmentListing$: Observable<any>;
  agentInfo$: Observable<any>;
  apartmentListingsLoading$: Observable<boolean>;

  filteredRentValue: number = 0;
  bedroomsSelections = {
    studio: false,
    bed1: false,
    bed2: false,
    bed3: false,
  };
  filterFavoriteProperty: boolean = false;

  constructor(private store: Store<AppState>) {
    this.apartmentListingsLoading$ = this.store.select(
      fromSelectors.getApartmentListingsLoading
    );
    this.agentInfo$ = this.store.select(fromSelectors.getAgentInfo);
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

  pitch(event: any) {
    this.filteredRentValue = event.value;
  }

  toggleStudioCheckbox(e: MatCheckboxChange) {
    this.bedroomsSelections = {
      ...this.bedroomsSelections,
      studio: e.checked,
    };
  }

  toggleBed1Checkbox(e: MatCheckboxChange) {
    this.bedroomsSelections = {
      ...this.bedroomsSelections,
      bed1: e.checked,
    };
  }

  toggleBed2Checkbox(e: MatCheckboxChange) {
    this.bedroomsSelections = {
      ...this.bedroomsSelections,
      bed2: e.checked,
    };
  }

  toggleBed3Checkbox(e: MatCheckboxChange) {
    this.bedroomsSelections = {
      ...this.bedroomsSelections,
      bed3: e.checked,
    };
  }

  togglePropertyFavorite() {
    this.filterFavoriteProperty = !this.filterFavoriteProperty;
  }

  updateListingFilters() {
    const filterPayload = {
      rent: this.filteredRentValue,
      bedrooms: this.bedroomsSelections,
      favoriteProperties: this.filterFavoriteProperty,
    };
  }
}
