import { Component, OnInit, AfterViewInit } from '@angular/core';
import { mapboxToken } from '../../../../assets/configurations/mapbox';
// import * as mapboxgl from 'mapbox-gl';
// const mapboxgl = require('mapbox-gl');
// declare var mapboxgl;
declare var mapboxgl: any; //declare moment

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  // map: mapboxgl.Map;
  map: any;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 45.899977;
  lng = 6.172652;
  zoom = 12;

  constructor() {
    mapboxgl.accessToken = mapboxToken;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    // });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
