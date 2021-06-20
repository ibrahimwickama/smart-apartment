import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  mapboxToken,
  mapTilerToken,
} from '../../../../assets/configurations/mapbox';
declare var mapboxgl: any;
// declare var maplibregl: any;

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
  lat = 45.899977;
  lng = 6.172652;
  zoom = 12;

  constructor() {
    mapboxgl.accessToken = mapboxToken;
    // maplibregl.accessToken = mapboxToken;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.buildMap();
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
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    // add markers to map
    // geojson.features.forEach(function (marker) {
    //   // make a marker for each feature and add it to the map
    //   new mapboxgl.Marker()
    //     .setLngLat(marker.geometry.coordinates)
    //     .addTo(this.map);
    // });
  }
}
