import { Component } from '@angular/core';
import { Kontakt } from '../model/Kontakt.model';
import { response } from 'express';
import { KontaktService } from '../services/kontakt.service';

@Component({
  selector: 'app-add-kontakt',
  templateUrl: './add-kontakt.component.html',
  styleUrls: ['./add-kontakt.component.css']
})
export class AddKontaktComponent {

  kontakt: Kontakt; // Declare Kontakt object
   kontaktId!: number;
  constructor(private kontaktService: KontaktService) {
    // Initialize the Kontakt object
    this.kontakt = new Kontakt(this.kontaktId,'', '', '', '', '', true);
  }

  onSubmit() {
    this.kontakt.isShow = true;
    this.kontaktService.addKontakt(this.kontakt).subscribe(
      response => {
        console.log('Kontakt added successfully:', response);
        // Clear the form after successful submission
        this.kontakt = new Kontakt(this.kontaktId,'', '', '', '', '', true);
      },
      error => {
        console.error('Error adding Kontakt:', error);
      }
    );
  }

}
