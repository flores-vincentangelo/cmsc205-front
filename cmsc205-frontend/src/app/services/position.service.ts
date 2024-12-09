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
}
