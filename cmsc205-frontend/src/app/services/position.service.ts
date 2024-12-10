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
    return this.markerDataArr.map((markerData) => {
      return {
        markerId: markerData.markerId,
        position: markerData.position,
      };
    });
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
      state: 'clean',
      markerId: '1',
      position: { lat: 14.63204607870904, lng: 121.02621501232493 },
      description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,
      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
    {
      userId: '1',
      state: 'clean',
      markerId: '2',
      position: { lat: 14.629056365246745, lng: 121.02909034038889 },
      description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,

      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
    {
      userId: '1',
      state: 'clean',
      markerId: '3',
      position: { lat: 14.633208734056646, lng: 121.03372519756662 },
      description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,
      datePosted: '12 10 2024',
      image:
        'https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg',
    },
  ];
}
