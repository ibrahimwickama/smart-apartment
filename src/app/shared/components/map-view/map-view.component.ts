import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import {
  mapboxToken,
  mapTilerToken,
} from '../../../../assets/configurations/mapbox';
import {
  getMapPins,
  getPropertyInfoLoading,
  getApartmentListingsLoading,
} from '../../../store/selectors/page-state.selectors';
import { first } from 'rxjs/operators';
import { FeatureCollection } from '../../../store/models/map';
import { convertMapPinsToMarkers } from '../../helpers/map.helper';

// import * as mapboxgl from '';
// let mapboxgl = require('mapbox-gl')
declare let mapboxgl: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  apartmentListingsLoading$: Observable<boolean>;
  propertyInfoLoading$: Observable<boolean>;
  map: any;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  mapPins: any = [];
  markerElements: any = [];
  mapLoaded: boolean = false;
  source: any;
  markers: any;

  constructor(private store: Store<AppState>) {
    mapboxgl.accessToken = mapboxToken;
    this.apartmentListingsLoading$ = this.store.select(
      getApartmentListingsLoading
    );
    this.propertyInfoLoading$ = this.store.select(getPropertyInfoLoading);
    this.store.select(getMapPins).subscribe((mapPins) => {
      this.mapPins = mapPins;
      if (mapPins.length > 1 && this.mapLoaded) {
        this.loadMapWithPins();
      } else if (mapPins.length == 1 && this.mapLoaded) {
        this.zoomToMarker();
      }
    });
  }

  ngOnInit() {
    this.map = mapboxgl.Map;
    this.store
      .select(getMapPins)
      .pipe(first((pins) => pins.length))
      .subscribe((mapPins) => {
        if (mapPins.length > 1) {
          this.mapPins = mapPins;
          this.buildInitMap();
        }
      });
  }

  ngAfterViewInit() {}
  buildInitMap() {
    try {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 12.7,
        center: this.getCenterCoordinates(),
      });

      /// Add data on map load
      this.map.on('load', (event) => {
        /// register source
        const markersPins = convertMapPinsToMarkers(this.mapPins);
        this.map.addSource('smartApartments', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markersPins,
          },
        });

        /// get source
        this.source = this.map.getSource('smartApartments');

        /// create map layers with realtime data
        this.map.addLayer({
          id: 'smartApartments',
          source: 'smartApartments',
          type: 'symbol',
          layout: {
            'text-size': 24,
            'text-transform': 'uppercase',
            'text-offset': [0, 1.5],
          },
          paint: {
            'text-color': '#f16624',
            'text-halo-color': '#fff',
            'text-halo-width': 2,
          },
        });
        this.mapLoaded = true;
        this.loadMapWithPins();
      });
    } catch (e) {}
  }

  loadMapWithPins() {
    // delete all maerkers
    this.markerElements.forEach((markerToRemove) => {
      var markerElement = document.getElementById(markerToRemove.propertyid);
      try {
        markerElement.remove();
      } catch (e) {}
    });

    this.markerElements = [];
    // add markers to map
    const bounds = [];
    this.mapPins.forEach((marker) => {
      // make a marker for each feature and add it to the map
      bounds.push(
        new mapboxgl.LngLat(marker.coordinates[0], marker.coordinates[1])
      );
      // create custom marker html
      var el = document.createElement('div');
      el.className = 'marker';
      el.id = marker?.id;
      el['data-coordinates'] = JSON.stringify(marker.coordinates);
      el.style.backgroundImage = marker.favorite
        ? 'url(/assets/svg/pin-red-heart.svg)'
        : 'url(/assets/svg/pin-red.svg)';
      el.style.width = marker.favorite ? '52px' : '32px';
      el.style.height = marker.favorite ? '52px' : '32px';
      el.style.backgroundSize = '100%';
      // create custom marker html
      const markerElement = new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h4>${marker?.name}</h4>
          <p style="color: #6c757d">
          ${marker?.city}, ${marker?.streetAddress}
          </p>`
          )
        )
        .addTo(this.map);
      this.markerElements.push({
        ...markerElement,
        propertyid: marker?.id,
      });
      const markerDiv = markerElement.getElement();
      markerDiv.addEventListener('mouseenter', () =>
        markerElement.togglePopup()
      );
      markerDiv.addEventListener('mouseleave', () =>
        markerElement.togglePopup()
      );
      markerElement.getElement().addEventListener('click', (event) => {
        const propertyCoordinates = JSON.parse(
          event?.srcElement['data-coordinates'] || ''
        );
        this.map.flyTo({
          center: propertyCoordinates,
          essential: true,
          zoom: 16,
        });

        // remove detail pop-up
        markerElement.togglePopup();
        const propertyId = event?.srcElement['id'] || '';

        window.location.href = `#/dashboard/home?view=property&propertyid=${propertyId}`;
      });
    });

    this.map.flyTo({
      center: this.getCenterCoordinates(),
      essential: true,
      zoom: 12.7,
    });
  }

  zoomToMarker() {
    const focusedMarker = this.mapPins[0];
    try {
      const toRemoveMarkers = this.markerElements.filter(
        (markerElement) => markerElement.propertyid !== focusedMarker.id
      );
      toRemoveMarkers.forEach((markerToRemove) => {
        var markerElement = document.getElementById(markerToRemove.propertyid);
        markerElement.remove();
      });
      // fly to marker
      this.map.flyTo({
        center: focusedMarker.coordinates,
        essential: true,
        zoom: 16,
      });
    } catch (e) {}
  }

  getCenterCoordinates() {
    const bounds = [];
    this.mapPins.forEach(function (marker) {
      bounds.push(
        new mapboxgl.LngLat(marker.coordinates[0], marker.coordinates[1])
      );
    });
    let llb = new mapboxgl.LngLatBounds(...bounds);
    const centerCoordinates = llb.getCenter();
    return centerCoordinates;
  }
}
