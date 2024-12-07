import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  loc$ = new BehaviorSubject<Coordinates>({ lat: 0, lng: 0 });
  constructor() {}

  getCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (position) {
          this.loc$.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } else {
        }
      },
    );
  }

  updateCenter(position: google.maps.LatLngLiteral): void {
    this.loc$.next(position)
  }
}
