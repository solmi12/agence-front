import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../model/Hotels.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private baseUrl = 'http://localhost:8080/hotels'; 
  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}`);
  }

  
  getHotelById(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${hotelId}`);
  }
  createHotel(hotelData: any): Observable<Hotel> {
    // Update the URL based on your API endpoint
    const url = `${this.baseUrl}/add`;
  
    // Set the request headers if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    // Make an HTTP POST request with the data
    return this.http.post<Hotel>(url, hotelData, { headers });
  }
  
  

  updateHotel(hotelId: number, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/${hotelId}`, hotel);
  }

  deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${hotelId}`);
  }

}
