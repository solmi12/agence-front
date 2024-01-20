import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../model/Faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  private apiUrl = 'http://localhost:8080/faqs';

  constructor( private http: HttpClient) { }


 getAllFaqs(): Observable<Faq[]> {
  return this.http.get<Faq[]>(this.apiUrl);
}
addFaq(faq: Faq): Observable<Faq> {
  return this.http.post<Faq>(`${this.apiUrl}/add`, faq);
}

getFaqsByCategory(category: string): Observable<Faq[]> {
  const params = new HttpParams().set('category', category);
  return this.http.get<Faq[]>(`${this.apiUrl}/category/${category}`, { params });
}


getFaqById(id: number): Observable<Faq> {
  return this.http.get<Faq>(`${this.apiUrl}/${id}`);
}

updateFaq(id: number, updatedFaq: Faq): Observable<Faq> {
  return this.http.put<Faq>(`${this.apiUrl}/${id}`, updatedFaq);
}

deleteFaq(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
