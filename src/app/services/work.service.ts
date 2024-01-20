import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkRequest } from '../model/WorkRequest.model';
import { WorkResponse } from '../model/WorkResponse';


@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private Url = 'http://localhost:8080/work'; 

  constructor(private http: HttpClient) { 
   
   
  }
  saveWork=(work:WorkRequest)=>{
    const token = localStorage.getItem('token');
    console.log(token)

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = localStorage.getItem('userId');

    return this.http.post(`${this.Url}/post/${userId}`,work,{headers});

    }
    getWorkByUserId=()=>{
      const token = localStorage.getItem('token');
      console.log(token)
  
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const userId = localStorage.getItem('userId');
  
      return this.http.get<WorkResponse[]>(`${this.Url}/last/${userId}`,{headers});
      
    }

    deleteWorkById=(id:Number)=>{
      const token = localStorage.getItem('token');
  
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.Url}/delete/${id}`,{headers})
    }




    UpdateWork=(work:WorkRequest,workId:Number)=>{
      const token = localStorage.getItem('token');
  
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.put(`${this.Url}/update/${workId}`,work,{headers});
  
      }
      getAllWorkByUserId=()=>{
        const token = localStorage.getItem('token');
        console.log(token)
    
        
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const userId = localStorage.getItem('userId');
    
        return this.http.get<WorkResponse[]>(`${this.Url}/get/${userId}`,{headers});
        
      }

      

}
