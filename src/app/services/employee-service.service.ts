import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeRegister } from '../model/EmployeeRegister.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registerEmployee(employer: EmployeeRegister): Observable<string> {
    const url = `${this.baseUrl}/register_employee`;
    const headers = this.getHeaders();
  
    // Explicitly specify responseType as 'text'
    return this.http.post(url, employer, { headers, responseType: 'text' });
  }
  

  deleteEmployee(id: number): Observable<void> {
    const url = `${this.baseUrl}/deleteEmployee/${id}`;
    const headers = this.getHeaders();

    return this.http.delete<void>(url, { headers });
  }

  
  getAllEmployees(): Observable<EmployeeRegister[]> {
    const url = `${this.baseUrl}/allEmployees`;
    const headers = this.getHeaders();

    return this.http.get<EmployeeRegister[]>(url, { headers });
  }
  updateEmployee(userId: number, employer: EmployeeRegister): Observable<string> {
    const url = `${this.baseUrl}/updateEmployee/${userId}`;
    const headers = this.getHeaders();
  
    return this.http.put(url, employer, { headers, responseType: 'text' });
  }
  

  getEmployeeById(): Observable<EmployeeRegister> {
    const url = `${this.baseUrl}/${localStorage.getItem('userId')}`;
    const headers = this.getHeaders();

    return this.http.get<EmployeeRegister>(url, { headers });
  }
}
