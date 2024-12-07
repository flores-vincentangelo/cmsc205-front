import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';

@Component({
  standalone: true,
  selector: 'app-map-page',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  ls = inject(LocationService)

  mapOptions: google.maps.MapOptions = {
    center: { lat: 40.73061, lng: -73.935242 },
    zoom: 15
  }
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 }; // Example: New York City
  zoom = 15;

  ngOnInit(): void {
    this.ls.getLocation()
    this.ls.currentLoc$.subscribe(value => {
      this.center = { lat: value.lat, lng: value.lng };
      this.mapOptions.center = { lat: value.lat, lng: value.lng };
    })
  }

}
