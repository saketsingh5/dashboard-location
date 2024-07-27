import * as L from 'leaflet';

export class LeafletMap {
  private map: L.Map;

  constructor(private mapId: string) {}

  initializeMap(latitude: number, longitude: number): void {
    this.map = L.map(this.mapId).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addMarker(latitude: number, longitude: number, popupText: string): void {
    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(popupText)
      .openPopup();
  }

  fitToBounds(locations: L.LatLng[]): void {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations);
      this.map.fitBounds(bounds);
    }
  }
}
