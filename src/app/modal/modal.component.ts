import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee-service.service';
import { WorkService } from '../services/work.service';
import { WorkResponse } from '../model/WorkResponse';
import { WorkRequest } from '../model/WorkRequest.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  work!:WorkResponse
  workRequest:WorkRequest={
    title: '',
    startTime: '',
    duration: '',
    description: ''
  }
  constructor(private employeeService:EmployeeService,private toastr: ToastrService,private workService:WorkService,private router: Router,private modalService: NgbModal ){

  }



  saveWorkUpdated=(form:NgForm)=>{

    if(form.valid){
      console.log(form.value.description)
    this.workRequest.description=form.value.description
    this.workRequest.duration= form.value.duration;
    this.workRequest.startTime=form.value.startTime
    this.workRequest.title=form.value.title

    this.workService.UpdateWork(this.workRequest,this.work.workId).subscribe((data)=>{
      this.toastr.success("work updated successful!")
      this.modalService.dismissAll(); // This will close all open modals

      
      form.resetForm();  
    },
    (error)=>{
      this.toastr.error("failed to update!")
    })
    }else{
      this.toastr.error("'Form is not valid. Please fill out all required fields.'")
    }
    
    
  }
  closeModal() {
    this.modalService.dismissAll(); // This will close all open modals
  }
  

}
