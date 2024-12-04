import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  standalone: true,
  selector: 'app-map-page',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 }; // Example: New York City
  zoom = 12;
}
