import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import { Store } from '@ngrx/store';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  updateMapPinsFromFilters,
  resetMapPins,
} from 'src/app/store/actions/page-state.actions';
import {
  getCurrentDevice,
  getApartmentListingsLoading,
  getAgentInfo,
  getApartmentListingData,
} from 'src/app/store/selectors/page-state.selectors';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css'],
})
export class AgentPageComponent implements OnInit {
  currentDevice$: Observable<string>;
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
    this.currentDevice$ = this.store.select(getCurrentDevice);
    this.apartmentListingsLoading$ = this.store.select(
      getApartmentListingsLoading
    );
    this.agentInfo$ = this.store.select(getAgentInfo);
    this.apartmentListing$ = this.store.select(getApartmentListingData);
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
    this.updateListingFilters();
  }

  updateListingFilters() {
    const filterPayload = {
      rent: this.filteredRentValue,
      bedrooms: this.bedroomsSelections,
      favoriteProperties: this.filterFavoriteProperty,
    };
    this.store.dispatch(updateMapPinsFromFilters({ payload: filterPayload }));
  }

  resetFilters() {
    this.filteredRentValue = 0;
    this.bedroomsSelections = {
      studio: false,
      bed1: false,
      bed2: false,
      bed3: false,
    };
    this.filterFavoriteProperty = false;
    this.store.dispatch(resetMapPins());
  }
}
