import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import * as L from 'leaflet';
import { Contact } from '@app/models/contact.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked, OnDestroy {
  contacts: Contact[] = [];
  isTableView = true;
  private mapInitialized = false;
  private map: L.Map | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      if (this.isTableView) {
        this.updateMap(); // Update map if it's visible
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isTableView && !this.mapInitialized) {
      this.initializeMap();
      this.mapInitialized = true;
    }
  }

   getRandomAddress(addresses: string[]): string {
    if (addresses.length === 0) return 'No address';
    const randomIndex = Math.floor(Math.random() * addresses.length);
    return addresses[randomIndex];
  }

  toggleView(): void {
    this.isTableView = !this.isTableView;
    if (!this.isTableView) {
      setTimeout(() => {
        this.initializeMap();
      }, 0);
    } else {
      this.cleanUpMap();
    }
  }

  initializeMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container element not found.');
      return;
    }

    if (!this.map) {
      this.map = L.map(mapElement).setView([27.5706, 80.0982], 13); // Default view if no contacts

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    } else {
      this.map.invalidateSize(); // Update map size when container dimensions change
    }

    this.updateMap();
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
        .bindPopup(`${contact.name}<br>${contact.phoneNumber}<br>${contact.email}`);
    });

    if (this.contacts.length > 0) {
      const bounds = L.latLngBounds(this.contacts.map(contact => L.latLng(contact.latitude, contact.longitude)));
      this.map.fitBounds(bounds);
    }
  }

  cleanUpMap(): void {
    if (this.map) {
      this.map.remove(); // Remove the map instance
      this.map = undefined; // Clear the map reference
      this.mapInitialized = false; // Reset initialization flag
    }
  }

  ngOnDestroy(): void {
    this.cleanUpMap(); // Clean up the map when the component is destroyed
  }
}
