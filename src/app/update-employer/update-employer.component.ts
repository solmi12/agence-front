import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee-service.service';

@Component({
  selector: 'app-update-employer',
  templateUrl: './update-employer.component.html',
  styleUrls: ['./update-employer.component.css']
})

export class UpdateEmployerComponent implements OnInit{
  employee: any = {}; 
  constructor(private registerService:EmployeeService){}
  ngOnInit(): void {
    this.employee = history.state.employee;
    console.log(this.employee);
  }
  @ViewChild('fileInput', { static: false }) fileInput!: any;

 

  register(form: NgForm) {
    
    const file: File = this.fileInput.nativeElement.files[0];
    
    const employee = {
      firstname: form.value.firstname,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      birthDay: form.value.birthDay,
      role: form.value.role
    };

    this.registerService.updateEmployee(this.employee,this.employee.id)
    
    
  
    
    

  
  }

}
