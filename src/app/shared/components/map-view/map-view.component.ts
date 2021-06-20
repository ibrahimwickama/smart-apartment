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
  // map: mapboxgl.Map;
  map: any;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  // style = `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerToken}`;
  zoom = 3;

  mapPins: any = [];

  constructor(private store: Store<AppState>) {
    mapboxgl.accessToken = mapboxToken;
    this.store.select(fromSelectors.getMapPins).subscribe((mapPins) => {
      this.mapPins = mapPins;
      if (mapPins.length > 1) {
        this.buildMap();
      } else if (mapPins.length == 1) {
        this.zoomToMarker();
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // this.buildMap();
  }

  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     container: 'map',
  //     style: this.style,
  //     zoom: this.zoom,
  //     center: [this.lng, this.lat],
  //   });

  //   // if you want to add navigation controls
  //   // this.map.addControl(new mapboxgl.NavigationControl());
  // }

  buildMap() {
    try {
      let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 12.7,
        // center: [this.lng, this.lat],
      });

      // add markers to map
      const bounds = [];
      this.mapPins.forEach(function (markerCoordinates) {
        // make a marker for each feature and add it to the map
        bounds.push(
          new mapboxgl.LngLat(markerCoordinates[0], markerCoordinates[1])
        );
        new mapboxgl.Marker().setLngLat(markerCoordinates).addTo(map);
      });

      let llb = new mapboxgl.LngLatBounds(...bounds);
      const centerCoordinates = llb.getCenter();
      map.fitBounds(llb);
      map.flyTo({
        center: centerCoordinates,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
      this.map = map;
    } catch (e) {}
  }

  zoomToMarker() {
    try {
      let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 16,
      });

      // add markers to map
      this.mapPins.forEach(function (markerCoordinates) {
        // make a marker for each feature and add it to the map
        new mapboxgl.Marker().setLngLat(markerCoordinates).addTo(map);
      });

      let sw = new mapboxgl.LngLat(this.mapPins[0][0], this.mapPins[0][1]);
      let ne = new mapboxgl.LngLat(this.mapPins[0][0], this.mapPins[0][1]);
      let llb = new mapboxgl.LngLatBounds(sw, ne);

      map.fitBounds(llb);
      map.flyTo({
        center: this.mapPins[0],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });

      this.map = map;
    } catch (e) {}
  }
}
