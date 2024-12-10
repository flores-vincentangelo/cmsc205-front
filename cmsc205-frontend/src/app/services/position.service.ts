import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Marker, MarkerData } from '../models/marker';

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

  getMarkers(): Marker[] {
    return [
      {
        markerId: '1',
        position: { lat: 14.63204607870904, lng: 121.02621501232493 },
      },
      {
        markerId: '2',
        position: { lat: 14.629056365246745, lng: 121.02909034038889 },
      },
      {
        markerId: '3',
        position: { lat: 14.633208734056646, lng: 121.03372519756662 },
      },
    ];
  }

  async getInfoWindowContents(
    markerId: string,
  ): Promise<MarkerData | undefined> {
    const mData = this.markerDataArr.find(
      (markerData) => markerData.markerId === markerId,
    );
    return mData;
  }

  markerDataArr: MarkerData[] = [
    {
      userId: '1',
      markerId: '1',
      position: { lat: 14.63204607870904, lng: 121.02621501232493 },
      description: 'some description',
      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
    {
      userId: '1',
      markerId: '2',
      position: { lat: 14.629056365246745, lng: 121.02909034038889 },
      description: 'some description',
      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
    {
      userId: '1',
      markerId: '3',
      position: { lat: 14.633208734056646, lng: 121.03372519756662 },
      description: 'some description',
      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
  ];
}
