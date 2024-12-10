import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapAdvancedMarker } from '@angular/google-maps';
import { Marker } from '../../../models/marker';

@Component({
  selector: 'app-marker',
  standalone: true,
  imports: [MapAdvancedMarker],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.css',
})
export class MarkerComponent {
  @Input() markerInput!: Marker;
  @Output() openInfoWindowEvent = new EventEmitter<any>();

  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
    gmpClickable: true,
  };

  clickMarker(position: google.maps.LatLngLiteral) {
    console.log(position);
  }

  openInfoWindow(marker: MapAdvancedMarker) {
    const emitObj = {
      markerElement: marker,
      marker: this.markerInput,
    };
    this.openInfoWindowEvent.emit(emitObj);
  }
}
