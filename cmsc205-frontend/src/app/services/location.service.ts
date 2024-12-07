import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLoc$ = new BehaviorSubject<Coordinates>({ lat: 0, lng: 0 });
  constructor() {}

  getLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (position) {
          this.currentLoc$.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        } else {
        }
      },
    );
  }
}
