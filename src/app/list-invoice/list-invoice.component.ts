import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {
  invoices: any[] = []; // Assuming your invoices have a specific structure, replace 'any' with the actual type

  constructor(private invoiceService: InvoiceService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe(
      (data: any) => {
        this.invoices = data;
      },
      (error) => {
        console.error('Error loading invoices:', error);
        // Handle the error as needed
      }
    );
  }
  deleteInvoice(event: Event, invId: number) {
    event.stopPropagation(); // Stop the event from propagating to the row click event
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(invId).subscribe(
        (response: any) => {
          console.log(response);
  
          if (response.message === 'Invoice deleted successfully') {
            // Handle successful deletion
            this.removeDeletedInvoiceFromUI(invId);
  
            // Display a success message using Toastr or any other notification method
            this.toastr.success('Invoice deleted successfully.');
          } else {
            // Handle other response messages or errors here
            console.error('Error deleting invoice:', response);
            // You can display an error message or handle it in another way
          }
        },
        (error) => {
          console.error('Error deleting invoice:', error);
          // Handle the error as needed, e.g., show an error message to the user
        }
      );
    }
  }
  
  private removeDeletedInvoiceFromUI(invId: number) {
    const index = this.invoices.findIndex((invoice) => invoice.invId === invId);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
  }
  
  
  
  
  
  
  navigateToInvoiceDetail(invId: number) {
    // Navigate to the invoice detail page with the invoice ID
    this.router.navigate(['/invoiceDetail', invId]);
  }
}
