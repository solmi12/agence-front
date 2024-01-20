import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HajServiceService {

  private baseUrl = 'http://localhost:8080/haj';
  constructor(private http: HttpClient, private router: Router,private toastr:ToastrService) { }


  addHaj(formData: FormData):Observable<any> {
    
    const token = localStorage.getItem('token');
    console.log(token)

    
    const headers = new HttpHeaders();

    
    
    return this.http.post(`${this.baseUrl}/add`, formData, {headers});
}
getHajByCategory(category: string): Observable<Haj[]> {
  const url = `${this.baseUrl}/byCategory/${category}`;
  return this.http.get<Haj[]>(url);
}
getAllHaj(): Observable<Haj[]> {
  return this.http.get<Haj[]>(`${this.baseUrl}`);
}
getHajById(hajId: number): Observable<Haj> {
  return this.http.get<Haj>(`${this.baseUrl}/${hajId}`);
}
deleteHaj(hajId: number, options: any): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${hajId}`, options);
}

getHajWithShowNowTrue(): Observable<Haj[]> {
  return this.http.get<Haj[]>(`${this.baseUrl}/showNowTrue`);
}
getHajWithShowNowFalse(): Observable<Haj[]> {
  return this.http.get<Haj[]>(`${this.baseUrl}/showNowFalse`);
}

updateHaj(hajId: number, formData: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  console.log(token);

  const headers = new HttpHeaders();

  return this.http.put(`${this.baseUrl}/${hajId}`, formData, { headers });
}
}