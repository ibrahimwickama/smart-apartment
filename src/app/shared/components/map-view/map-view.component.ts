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
  // map: mapboxgl.Map;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';

  mapPins: any = [];
  markerElements: any = [];

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
      // TODO: Find best way to update map without re-rendering entire map visualization
      if (mapPins.length > 1) {
        // this.buildMap();
      } else if (mapPins.length == 1) {
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

  // buildMap() {
  //   try {
  //     let map = new mapboxgl.Map({
  //       container: 'map',
  //       style: this.style,
  //       zoom: 12.7,
  //       center: this.getCenterCoordinates(),
  //     });

  //     // add markers to map
  //     const bounds = [];
  //     this.mapPins.forEach(function (marker) {
  //       // make a marker for each feature and add it to the map
  //       bounds.push(
  //         new mapboxgl.LngLat(marker.coordinates[0], marker.coordinates[1])
  //       );
  //       // create custom marker html
  //       var el = document.createElement('div');
  //       el.className = 'marker';
  //       el.id = marker?.id;
  //       el.style.backgroundImage = marker.favorite
  //         ? 'url(/assets/svg/pin-red-heart.svg)'
  //         : 'url(/assets/svg/pin-red.svg)';
  //       el.style.width = marker.favorite ? '52px' : '32px';
  //       el.style.height = marker.favorite ? '52px' : '32px';
  //       el.style.backgroundSize = '100%';
  //       // create custom marker html
  //       const markerElement = new mapboxgl.Marker(el)
  //         .setLngLat(marker.coordinates)
  //         .setPopup(
  //           new mapboxgl.Popup().setHTML(
  //             `<h4>${marker?.name}</h4>
  //             <p style="color: #6c757d">
  //             ${marker?.city}, ${marker?.streetAddress}
  //             </p>`
  //           )
  //         )
  //         .addTo(map);
  //       const markerDiv = markerElement.getElement();
  //       markerDiv.addEventListener('mouseenter', () =>
  //         markerElement.togglePopup()
  //       );
  //       markerDiv.addEventListener('mouseleave', () =>
  //         markerElement.togglePopup()
  //       );
  //       markerElement.getElement().addEventListener('click', (e) => {
  //         // remove detail pop-up
  //         markerElement.togglePopup();
  //         const propertyId = event?.srcElement['id'] || '';
  //         window.location.href = `#/dashboard/home?view=property&propertyid=${propertyId}`;
  //       });
  //     });

  //     this.map = map;
  //   } catch (e) {}
  // }

  // zoomToMarker() {
  //   const coordinates = this.mapPins[0].coordinates || [];
  //   try {
  //     let map = new mapboxgl.Map({
  //       container: 'map',
  //       style: this.style,
  //       zoom: 16,
  //       center: coordinates,
  //     });

  //     // add markers to map
  //     this.mapPins.forEach(function (marker) {
  //       // make a marker for each feature and add it to the map
  //       // create custom marker html
  //       var el = document.createElement('div');
  //       el.className = 'marker';
  //       el.id = marker?.id;
  //       el.style.backgroundImage = marker.favorite
  //         ? 'url(/assets/svg/pin-red-heart.svg)'
  //         : 'url(/assets/svg/pin-red.svg)';
  //       el.style.width = '52px';
  //       el.style.height = '52px';
  //       el.style.backgroundSize = '100%';
  //       // create custom marker html

  //       const markerElement = new mapboxgl.Marker(el)
  //         .setLngLat(marker.coordinates)
  //         .setPopup(
  //           new mapboxgl.Popup().setHTML(
  //             `<h4>${marker?.name}</h4>
  //             <p style="color: #6c757d">
  //             ${marker?.city}, ${marker?.streetAddress}
  //             </p>`
  //           )
  //         )
  //         .addTo(map);
  //       const markerDiv = markerElement.getElement();
  //       markerDiv.addEventListener('mouseenter', () =>
  //         markerElement.togglePopup()
  //       );
  //       markerDiv.addEventListener('mouseleave', () =>
  //         markerElement.togglePopup()
  //       );
  //     });
  //     this.map = map;
  //   } catch (e) {}
  // }

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
      });
    } catch (e) {}
  }

  loadMapWithPins() {
    /// get source
    this.source = this.map.getSource('smartApartments');
    // let data = new FeatureCollection(markers)
    // this.source.setData(data);
    this.mapPins.forEach((marker) => {
      // make a marker for each feature and add it to the map
      // create custom marker html
      var el = document.createElement('div');
      el.className = 'marker';
      el.id = marker?.id;
      el['data-coordinates'] = JSON.stringify(marker.coordinates);
      el.style.backgroundImage = marker.favorite
        ? 'url(/assets/svg/pin-red-heart.svg)'
        : 'url(/assets/svg/pin-red.svg)';
      el.style.width = '52px';
      el.style.height = '52px';
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
      const markerDiv = markerElement.getElement();
      markerDiv.addEventListener('mouseenter', () =>
        markerElement.togglePopup()
      );
      markerDiv.addEventListener('mouseleave', () =>
        markerElement.togglePopup()
      );
    });
  }

  buildMap() {
    try {
      let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 12.7,
        center: this.getCenterCoordinates(),
      });

      // add markers to map
      const bounds = [];
      this.mapPins.forEach(function (marker) {
        // make a marker for each feature and add it to the map
        bounds.push(
          new mapboxgl.LngLat(marker.coordinates[0], marker.coordinates[1])
        );
        // create custom marker html
        var el = document.createElement('div');
        el.className = 'marker';
        el.id = marker?.id;
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
          .addTo(map);
        const markerDiv = markerElement.getElement();
        markerDiv.addEventListener('mouseenter', () =>
          markerElement.togglePopup()
        );
        markerDiv.addEventListener('mouseleave', () =>
          markerElement.togglePopup()
        );
        markerElement.getElement().addEventListener('click', (e) => {
          map.flyTo(e.latlng, 13);
          // remove detail pop-up
          markerElement.togglePopup();
          const propertyId = event?.srcElement['id'] || '';
          window.location.href = `#/dashboard/home?view=property&propertyid=${propertyId}`;
        });
      });

      this.map = map;
    } catch (e) {}
  }

  zoomToMarker() {
    // const coordinates = this.mapPins[0].coordinates || [];
    const focusedMarker = this.mapPins[0];
    try {
      const toRemoveMarkers = this.markerElements.filter(
        (markerElement) => markerElement.propertyid !== focusedMarker.id
      );
      toRemoveMarkers.forEach((markerToRemove) => {
        var markerElement = document.getElementById(markerToRemove.propertyid);
        markerElement.remove();
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
