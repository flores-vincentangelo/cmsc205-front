import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapMarker } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';

@Component({
  standalone: true,
  selector: 'app-map-page',
  imports: [CommonModule, GoogleMap, MapAdvancedMarker, JsonPipe],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent {
  ls = inject(LocationService);

  @ViewChild(GoogleMap)
  googleMapsComponent!: GoogleMap;
  display: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 15;

  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
    gmpClickable: true,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit(): void {
    this.ls.getCurrentLocation();
    this.ls.loc$.subscribe((value) => {
      this.center = { lat: value.lat, lng: value.lng };
    });
  }

  ngAfterViewInit(): void {
    console.log('googleMapsComponent:', this.googleMapsComponent);
  }

  changeLoc(): void {
    const value = { lat: 20, lng: 20 };
    this.center = { lat: value.lat, lng: value.lng };
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.ls.updateCenter(event.latLng.toJSON());
    }
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  clickMarker(position: google.maps.LatLngLiteral) {
    console.log(position)
  }

}
