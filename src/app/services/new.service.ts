import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { New } from '../model/New.model';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private apiUrl = 'http://localhost:8080/news'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<New[]> {
    return this.http.get<New[]>(`${this.apiUrl}`);
  }

  getNewById(id: number): Observable<New> {
    return this.http.get<New>(`${this.apiUrl}/${id}`);
  }


  createNew(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)

    
    const headers = new HttpHeaders();

    return this.http.post<New>(`${this.apiUrl}/add`, formData, {headers,});
  }

  updateNew(id: number, newData: New, file: File | null): Observable<New> {
    const formData = new FormData();
    formData.append('newName', newData.newName);
    formData.append('newDescription', newData.newDescription);
    if (file) {
      formData.append('file', file);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put<New>(`${this.apiUrl}/${id}`, formData, {
      headers,
    });
  }

  deleteNew(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
