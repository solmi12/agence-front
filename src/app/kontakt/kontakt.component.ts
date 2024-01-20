import { Component } from '@angular/core';
import { KontaktService } from '../services/kontakt.service';
import { Kontakt } from '../model/Kontakt.model';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent {

  kontaktList: Kontakt[] = [];
  selectedKontakt: Kontakt | null = null;

  constructor(private kontaktService: KontaktService) {}

  ngOnInit() {
    this.loadKontakts();
  }

  loadKontakts() {
    this.kontaktService.getAllKontakts().subscribe(
      response => {
        this.kontaktList = response;
      },
      error => {
        console.error('Error loading Kontakts:', error);
      }
    );
  }

  deleteKontakt(id: number) {
    this.kontaktService.deleteKontakt(id).subscribe(
      response => {
        console.log('Kontakt deleted successfully:', response);
        this.loadKontakts(); // Refresh the list
        this.selectedKontakt = null; // Clear the detailed view
      },
      error => {
        console.error('Error deleting Kontakt:', error);
      }
    );
  }

}
