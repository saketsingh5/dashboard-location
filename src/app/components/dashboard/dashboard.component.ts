import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import * as L from 'leaflet';
import { Contact } from '@app/models/contact.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  contacts: Contact[] = [];
  private map: L.Map | undefined;
  private mapInitialized = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts.map(contact => ({
        ...contact,
        randomAddress: contact.randomAddress || this.getRandomAddress(contact.addresses) // Set randomAddress only if it's not already set
      }));
      if (this.mapInitialized) {
        this.updateMap();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  getRandomAddress(addresses: string[]): string {
    if (addresses.length === 0) return 'No address';
    const randomIndex = Math.floor(Math.random() * addresses.length);
    return addresses[randomIndex];
  }

  initializeMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container element not found.');
      return;
    }

    // Set default icon paths
    const defaultIcon = L.icon({
      iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = defaultIcon;

    this.map = L.map(mapElement).setView([27.5706, 80.0982], 13); // Default view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.mapInitialized = true; // Mark map as initialized

    this.updateMap(); // Update map with current data
  }

  updateMap(): void {
    if (!this.map) return;

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer); // Remove existing markers
      }
    });

    this.contacts.forEach(contact => {
      L.marker([contact.latitude, contact.longitude])
        .addTo(this.map)
        .bindPopup(`${contact.name}<br>${contact.phoneNumber}<br>${contact.email}<br>${contact.randomAddress}`);
    });

    if (this.contacts.length > 0) {
      const bounds = L.latLngBounds(this.contacts.map(contact => L.latLng(contact.latitude, contact.longitude)));
      this.map.fitBounds(bounds);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Clean up the map instance
    }
  }
}
