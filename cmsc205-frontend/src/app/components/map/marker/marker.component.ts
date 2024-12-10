import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MapAdvancedMarker } from '@angular/google-maps';

@Component({
  selector: 'app-marker',
  standalone: true,
  imports: [MapAdvancedMarker],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.css',
})
export class MarkerComponent {
  @Input() position!: google.maps.LatLngLiteral;
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
      marker: marker,
      position: this.position,
    };
    this.openInfoWindowEvent.emit(emitObj);
  }
}
