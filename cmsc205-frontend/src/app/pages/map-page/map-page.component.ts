import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';

@Component({
  standalone: true,
  selector: 'app-map-page',
  imports: [CommonModule, GoogleMap, MapMarker, JsonPipe],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent {
  @ViewChild(GoogleMap)
  googleMapsComponent!: GoogleMap;
  ls = inject(LocationService);

  display: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  marker = {
    position: { lat: 14.636367, lng: 121.037782 },
  };
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = { gmpDraggable: false };
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 1;

  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit(): void {
    this.ls.getLocation();
    this.ls.currentLoc$.subscribe((value) => {
      this.center = { lat: value.lat, lng: value.lng };
      this.mapOptions.center = { lat: value.lat, lng: value.lng };
      console.log(value.lat, value.lng);
    });
  }

  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    console.log('googleMapsComponent:', this.googleMapsComponent);
  }

  changeLoc(): void {
    const value = { lat: 20, lng: 20 };
    this.center = { lat: value.lat, lng: value.lng };
    console.log(this.center, this.mapOptions.center);
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  addMarker(event: google.maps.MapMouseEvent): void {}
}
