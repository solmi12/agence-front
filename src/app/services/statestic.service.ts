import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statestic } from '../model/Statestic.model';

@Injectable({
  providedIn: 'root'
})
export class StatesticService {

  private Url = 'http://localhost:8080/statestic'; 

  constructor(private http: HttpClient) { 
   
   
  }
  getStatesticInf=()=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Statestic>(`${this.Url}`,{headers})
  }
}
