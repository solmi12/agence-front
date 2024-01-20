import { Component } from '@angular/core';
import { Faq } from '../model/Faq.model';
import { FaqsService } from '../services/faqs.service';

@Component({
  selector: 'app-add-faqs',
  templateUrl: './add-faqs.component.html',
  styleUrls: ['./add-faqs.component.css']
})
export class AddFaqsComponent {

  faq:Faq;

  faqId!: number;
  faqAdded: boolean = false;
  constructor(private faqService: FaqsService) {
    this.faq = new Faq(this.faqId,'', '', '', true);
  }

  onSubmit() {


    this.faqService.addFaq(this.faq).subscribe(
      response => {
        console.log('FAQ added successfully:', response);
        // Clear the form after successful submission
     
        this.faq = new Faq(this.faqId,'', '', '', true);

           this.faqAdded = true;
      },
      error => {
        console.error('Error adding FAQ:', error);
      }
    );
 
  }
}
