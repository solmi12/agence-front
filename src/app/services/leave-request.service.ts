import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../model/LeaveRequest.model';
import { LeaveResponse } from '../model/LeaveResponse';
import { LeaveManegement } from '../model/LeaveMangement.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  private Url = 'http://localhost:8080/leaveRequest'; 

  constructor(private http: HttpClient) { 
   
   
  }

  sendLeaveRequest=(leave:LeaveRequest)=>{
    const token = localStorage.getItem('token');
    console.log(token)

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = localStorage.getItem('userId');
    return  this.http.post(`${this.Url}/${userId}`,leave,{headers});
    
  }
  getLastLeaveRequest=()=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = localStorage.getItem('userId');
    return  this.http.get<LeaveResponse[]>(`${this.Url}/last/${userId}`,{headers});
    
  }
  deleteById=(id:any)=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return  this.http.delete(`${this.Url}/delete/${id}`,{headers});
  }
  getAllPendingLeaveRequest=()=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return  this.http.get<LeaveManegement[]>(`${this.Url}/pending`,{headers});

  }
  acceptLeaveRequest=(id:any)=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return  this.http.put(`${this.Url}/accept/${id}`,null,{headers});

  }
  rejectLeaveRequest=(id:any)=>{
    const token = localStorage.getItem('token');

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return  this.http.put(`${this.Url}/reject/${id}`,null,{headers});
    
  }
}
