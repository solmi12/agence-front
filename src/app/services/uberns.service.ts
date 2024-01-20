import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Uberns } from '../model/Uberns.model';

@Injectable({
  providedIn: 'root'
})
export class UbernsService {



  private baseUrl = 'http://localhost:8080/uberns'; 
  constructor(private http : HttpClient) { }

  getAllUberns(): Observable<Uberns[]>{
    return this.http.get<Uberns[]>(`${this.baseUrl}`);
  }

  createUberns(ubernsData:any): Observable<Uberns>{
    const url = `${this.baseUrl}/add`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Uberns>(url,ubernsData,{headers});
  }
  deleteUberns(uberId: number): Observable<void> {
    const url = `${this.baseUrl}/${uberId}`;
    return this.http.delete<void>(url);
  }
}
