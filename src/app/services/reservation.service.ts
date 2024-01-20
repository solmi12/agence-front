import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomReservationChoice } from '../model/RoomReservationChoice.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/reservation';
  constructor(private http: HttpClient) { }

  addReservation(reservation: RoomReservationChoice[]): Observable<RoomReservationChoice[]> {
    return this.http.post<RoomReservationChoice[]>(`${this.baseUrl}/create`, reservation);
  }

  getReservations(): Observable<RoomReservationChoice[]> {
    return this.http.get<RoomReservationChoice[]>(`${this.baseUrl}/session`);
  }

  deleteRoomReservationChoiceBySessionIdentifier(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete`);
  }
}
