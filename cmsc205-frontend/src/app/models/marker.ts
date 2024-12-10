export interface Marker {
  markerId: string;
  position: google.maps.LatLngLiteral;
}

export interface MarkerData extends Marker {
  image: any;
  datePosted: string;
  description: string;
  userId: string;
  state: string;
}
