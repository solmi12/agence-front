import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kontakt } from '../model/Kontakt.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KontaktService {

  private apiUrl = 'http://localhost:8080/kontakt';

  constructor(private http:HttpClient) { }

  addKontakt(kontakt:Kontakt): Observable<Kontakt>{
    return this.http.post<Kontakt>(`${this.apiUrl}/add`, kontakt);
  }
  getAllKontakts(): Observable<Kontakt[]> {
    return this.http.get<Kontakt[]>(`${this.apiUrl}/getall`);
  }
  deleteKontakt(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/get/${id}`);
  }
}
