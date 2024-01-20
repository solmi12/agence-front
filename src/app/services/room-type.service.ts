import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomType } from '../model/room-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {


  private baseUrl = 'http://localhost:8080/room-types';
  constructor(private http: HttpClient) { }

  getRoomTypeById(roomTypeId: number): Observable<RoomType> {
    return this.http.get<RoomType>(`${this.baseUrl}/${roomTypeId}`);
  }
}
