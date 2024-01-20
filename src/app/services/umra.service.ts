import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Umra } from '../model/Umra.mode';
@Injectable({
  providedIn: 'root'
})
export class UmraService {

  private apiUrl = 'http://localhost:8080/umra';
  constructor( private http: HttpClient) { }

  addUmra(umra: Umra): Observable<Umra> {
    return this.http.post<Umra>(`${this.apiUrl}/add`, umra);
  }
}
