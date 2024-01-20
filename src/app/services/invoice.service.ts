// invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  createInvoice(invoice: any): Observable<any> {
    const endpoint = `${this.apiUrl}/invoices/create-and-pay`; // Adjust the endpoint as needed
    return this.http.post(endpoint, invoice);
  }
  deleteInvoice(invId: number): Observable<any> {
    const endpoint = `${this.apiUrl}/invoices/${invId}`;
    
    return this.http.delete(endpoint);
  }

  async getCountries(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>('https://restcountries.com/v3.1/all');
      return response.data.map((country: any) => country.name.common);
    } catch (error) {
      throw error;
    }
  }
  getAllInvoices(): Observable<any> {
    const endpoint = `${this.apiUrl}/invoices`; // The endpoint to get all invoices
    return this.http.get(endpoint);
  }
  getInvoiceById(invId: number): Observable<any> {
    const endpoint = `${this.apiUrl}/invoices/${invId}`; // Adjust the endpoint as needed
    return this.http.get(endpoint);
  }
}
