import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import * as fromActions from '../../../store/actions';
import * as fromSelectors from '../../../store/selectors';
import {
  mapboxToken,
  mapTilerToken,
} from '../../../../assets/configurations/mapbox';
declare let mapboxgl: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  map: any;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';

  mapPins: any = [];

  constructor(private store: Store<AppState>) {
    mapboxgl.accessToken = mapboxToken;
    this.store.select(fromSelectors.getMapPins).subscribe((mapPins) => {
      this.mapPins = mapPins;
      // TODO: Find best way to update map without re-rendering entire map visualization
      if (mapPins.length > 1) {
        this.buildMap();
      } else if (mapPins.length == 1) {
        this.zoomToMarker();
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

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
    const coordinates = this.mapPins[0].coordinates || [];
    try {
      let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 16,
        center: coordinates,
      });

      // add markers to map
      this.mapPins.forEach(function (marker) {
        // make a marker for each feature and add it to the map
        // create custom marker html
        var el = document.createElement('div');
        el.className = 'marker';
        el.id = marker?.id;
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
          .addTo(map);
        const markerDiv = markerElement.getElement();
        markerDiv.addEventListener('mouseenter', () =>
          markerElement.togglePopup()
        );
        markerDiv.addEventListener('mouseleave', () =>
          markerElement.togglePopup()
        );
      });
      this.map = map;
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
