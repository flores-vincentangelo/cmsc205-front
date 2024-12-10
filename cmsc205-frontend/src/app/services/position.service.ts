import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  currentPosition$ = new BehaviorSubject<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  positionInput$ = new BehaviorSubject<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  setPositionInput(position: google.maps.LatLngLiteral) {
    this.positionInput$.next(position);
  }

  constructor() {}

  getCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (position) {
          this.currentPosition$.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } else {
        }
      },
    );
  }

  updateCenter(position: google.maps.LatLngLiteral): void {
    this.currentPosition$.next(position);
  }

  getMarkers(): google.maps.LatLngLiteral[] {
    return [
      { lat: 14.63204607870904, lng: 121.02621501232493 },
      { lat: 14.629056365246745, lng: 121.02909034038889 },
      { lat: 14.633208734056646, lng: 121.03372519756662 },
    ];
  }
}
