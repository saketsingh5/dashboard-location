import { Injectable } from '@angular/core';
import { Contact } from '@app/models/contact.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsSubject = new BehaviorSubject<Contact[]>(this.loadContacts());

  constructor() {}

  getContacts() {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact) {
    contact.randomAddress = this.getRandomAddress(contact.addresses);
    const contacts = this.loadContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
    this.contactsSubject.next(contacts);
  }

  private loadContacts(): Contact[] {
    const contactsJson = localStorage.getItem('contacts');
    return contactsJson ? JSON.parse(contactsJson) : [];
  }

  private saveContacts(contacts: Contact[]) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  private getRandomAddress(addresses: string[]): string {
    if (addresses.length === 0) return 'No address';
    const randomIndex = Math.floor(Math.random() * addresses.length);
    return addresses[randomIndex];
  }
}
