import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit{
invoice:any;
isAdmin: boolean = true;
  constructor(private invoiceService: InvoiceService,  private authService: AuthService,private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invId = params['id'];
      this.getInvoiceDetails(invId);
    });
    this.authService.initAuthState().then(() => {
      this.isAdmin = this.authService.hasRole('ADMIN');
      console.log(this.isAdmin)
    });
  } 
  hasInvoiceData(): boolean {
    return this.invoice && Object.keys(this.invoice).length > 0;
  }

  getInvoiceDetails(invId: number): void {
    this.invoiceService.getInvoiceById(invId).subscribe(
      (invoice: any) => {
        this.invoice = invoice;
        console.log('Invoice Details:', invoice);
      },
      (error) => {
        console.error('Error fetching invoice details:', error);
      }
    );
  }
  
}
