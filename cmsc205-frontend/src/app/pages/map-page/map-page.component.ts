import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';
import { MarkerComponent } from '../../components/map/marker/marker.component';
import { ModalComponent } from '../../components/map/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { MarkerDetailsInputFormComponent } from '../../components/map/marker-details-input-form/marker-details-input-form.component';

@Component({
  standalone: true,
  selector: 'app-map-page',
  imports: [CommonModule, GoogleMap, JsonPipe, MarkerComponent, MapInfoWindow, ModalComponent, MarkerDetailsInputFormComponent],
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
  // zoom = 15;
  zoom = 1;

  pinOptions: google.maps.marker.PinElementOptions = {
    background: 'green',
    glyphColor: 'blue',
    scale: .5,
  }

  markerPositions: google.maps.LatLngLiteral[] = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  infoWindowContents: string = '';

  ms = inject(ModalService)
  async ngOnInit(): Promise<void> {
    // <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1"><path d="M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z"/></svg>
    // const { PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    // const pin = new PinElement({
    //   background: 'green',
    //   glyphColor: 'blue',
    //   scale: .5,
    // })
    // this.markerOptions.content = pin.element
    this.ls.getCurrentLocation();
    this.ls.loc$.subscribe((value) => {
      this.center = { lat: value.lat, lng: value.lng };
    });
  }

  ngAfterViewInit(): void {
    // console.log('googleMapsComponent:', this.googleMapsComponent);
    // console.log('advMarkers:', this.advMarkers);
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
      this.ms.isVisible$.next(true)
      // this.markerPositions.push(event.latLng.toJSON());
    }
  }

  openInfoWindow(object: any) {
    this.infoWindowContents = `${JSON.stringify(object.position)}`
    this.infoWindow.open(object.marker);
  }
}
