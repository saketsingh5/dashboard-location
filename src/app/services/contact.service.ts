import { Injectable } from '@angular/core';
import { Contact } from '@app/models/contact.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);

  constructor() {}

  getContacts() {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactsSubject.next(this.contacts);
  }
}
