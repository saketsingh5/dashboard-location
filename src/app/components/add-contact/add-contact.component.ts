import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '@app/models/contact.models';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private contactService: ContactService,
    private cdr: ChangeDetectorRef // Added ChangeDetectorRef for manual change detection
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([], Validators.maxLength(5)),
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    if (this.addresses.length < 5) {
      this.addresses.push(this.fb.control(''));
    }
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Current location:', { lat, lng }); // Log for debugging

          // Update form values
          this.contactForm.patchValue({
            latitude: lat,
            longitude: lng
          });

          // Ensure the form is updated
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        (error) => {
          console.error('Error getting location', error);
          // Handle location error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle lack of geolocation support
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
  
      const newContact: Contact = this.contactForm.value;
      this.contactService.addContact(newContact);
      this.router.navigate(['/dashboard']); // Navigate to dashboard after submission
    }
  }
}
