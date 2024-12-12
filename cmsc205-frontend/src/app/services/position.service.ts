import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

import { Marker, MarkerData } from '../models/marker';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private API_URL = environment.API_URL;
  http = inject(HttpClient);

  markerDataArr!: MarkerData[];

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

  getMarkers(): Observable<Marker[]> {
    return this.http.get<any>(this.API_URL + 'markers').pipe(
      tap((x) => console.log(x.markers)),
      map((res) => {
        let markerLikeArr: [] = res.markers;
        const markerArr: MarkerData[] = markerLikeArr.map((mLike: any) => {
          const mm: MarkerData = {
            markerId: mLike.MarkerId,
            position: { lat: mLike.Lat, lng: mLike.Lng },
            image: mLike.Image,
            datePosted: mLike.DatePosted,
            description: mLike.Description,
            userEmail: mLike.UserEmail,
            state: mLike.State,
            userFullname: mLike.UserFullName,
            userImage: mLike.UserImage,
          };
          return mm;
        });
        this.markerDataArr = markerArr;
        return markerArr;
      }),
    );
    // return this.markerDataArr.map((markerData) => {
    //   return {
    //     markerId: markerData.markerId,
    //     position: markerData.position,
    //   };
    // });
  }

  async getInfoWindowContents(
    markerId: string,
  ): Promise<MarkerData | undefined> {
    const mData = this.markerDataArr.find(
      (markerData) => markerData.markerId === markerId,
    );
    return mData;
  }
}
