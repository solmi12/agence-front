import { Component } from '@angular/core';
import { Faq } from '../model/Faq.model';
import { FaqsService } from '../services/faqs.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent {


  faqs: Faq[] = [];
  filteredFaqs: Faq[] = [];
  selectedCategory: string = '';
  categories: string[] = ['FLUG & TRANSFER', ' HOTEL & UNTERKUNFT', 'MEINE BUCHUNG','VISUM & UNTERLAGEN','REISESTORNIERUNG & GESUNDHEIT'];
  constructor(private faqService :  FaqsService ,  private dialog: MatDialog){

    this.filteredFaqs = this.faqs;
  }

  ngOnInit(): void {
    this.loadFaqs();
  }
  loadFaqs(): void {
    this.faqService.getAllFaqs().subscribe(faqs => {
      this.faqs = faqs;
      this.filteredFaqs = this.faqs; // Initialize filteredFaqs with all FAQs
    });
  }
  

  filterByCategory(category: string) {
    if (category === 'all') {
      this.filteredFaqs = this.faqs;
    } else {
      this.filteredFaqs = this.faqs.filter(faq => faq.categoriefaq === category);
    }
  }
  loadFaqsByCategory(category: string): void {
    this.faqService.getFaqsByCategory(category).subscribe(faqs => this.faqs = faqs);
  }

  toggleDescription(faq: Faq): void {
    faq.showDescription = !faq.showDescription;
  }
  
  showAll(): void {
    this.selectedCategory = '';

    this.loadFaqs();
  }

}
