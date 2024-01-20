import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../services/faqs.service';
import { Faq } from '../model/Faq.model';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faqs: Faq[] = [];
  selectedCategory: string = '';
  categories: string[] = ['FLUG & TRANSFER', 'HOTEL & UNTERKUNFT', 'MEINE BUCHUNG', 'VISUM & UNTERLAGEN', 'REISESTORNIERUNG & GESUNDHEIT'];
  isAdmin: boolean = true;  // Change this to true or false based on user role
  editingFaq: Faq | null = null;
  confirmationButtonEnabled: boolean = false;
  constructor(private faqService: FaqsService, private authService: AuthService,
     private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFaqs();
    this.authService.initAuthState().then(() => {
      this.isAdmin = this.authService.hasRole('ADMIN');
      this.loadFaqs();
    });
  }

  loadFaqs(): void {
    if (this.selectedCategory) {
      this.loadFaqsByCategory(this.selectedCategory);
    } 
     else {
      this.faqService.getAllFaqs().subscribe(faqs => this.faqs = faqs);
    }
  }

  loadFaqsByCategory(category: string): void {
    this.faqService.getFaqsByCategory(category).subscribe(faqs => this.faqs = faqs);
  }

  toggleDescription(faq: Faq): void {
    faq.showDescription = !faq.showDescription;
  }
  confirmDelete(faqId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this FAQ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFaq(faqId);
      }
    });
  }
  

  
cancelEdit() {
  this.editingFaq = null;
}
  toggleIsShow(faq: Faq): void {
   

    // Check if faq.faqId is not null before calling updateFaq
    if (faq.faqId !== null) {
      this.faqService.updateFaq(faq.faqId, faq).subscribe(updatedFaq => {
        // Update the FAQ in the list with the updated one
        const index = this.faqs.findIndex(f => f.faqId === updatedFaq.faqId);
        if (index !== -1) {
          this.faqs[index] = updatedFaq;
        }
      });
    }
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    this.loadFaqs();
  }

  showAll(): void {
    this.selectedCategory = '';

    this.loadFaqs();
  }

  deleteFaq(id: number) {
    this.faqService.deleteFaq(id).subscribe(() => {
      this.loadFaqs();
    });
  }
  editFaq(faq: Faq) {
    if (faq.faqId !== null) {
      this.editingFaq = faq; // Set the editing FAQ
      this.confirmationButtonEnabled = true; // Enable the confirmation button
    }
  }

  confirmEdit() {
    if (this.editingFaq) {
      this.faqService.updateFaq(this.editingFaq.faqId!, this.editingFaq).subscribe(updatedFaq => {
        const index = this.faqs.findIndex(f => f.faqId === updatedFaq.faqId);
        if (index !== -1) {
          this.faqs[index] = updatedFaq;
          this.editingFaq = null; // Reset the editing FAQ
          this.confirmationButtonEnabled = false; // Disable the confirmation button
        }
      });
    }
  }
}