import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee-service.service';
import { EmployeeModel } from '../model/Employee.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { WorkService } from '../services/work.service';
import { WorkRequest } from '../model/WorkRequest.model';
import { WorkResponse } from '../model/WorkResponse';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { EmployeeRegister } from '../model/EmployeeRegister.model';


@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  @ViewChild('myModal2') myModal: any;

  selectedWork!: WorkResponse 
   employee!:EmployeeRegister
   work:WorkRequest={
     title: '',
     startTime: '',
     duration: '',
     description: ''
   }
   works:WorkResponse[]=[];
  
  constructor(private employeeService:EmployeeService,private toastr: ToastrService,private workService:WorkService,private router: Router,private modalService: NgbModal ){
    
  }
  ngOnInit(): void {
    this.loadEmployee()
    this.loadWorks();
    
  }


  loadEmployee():void{
    this.employeeService.getEmployeeById().subscribe((data)=>{
      console.log(data)
          const imageUrl = 'data:image/jpeg;base64,' + data.imageUrl;
          data.imageUrl= imageUrl;
        this.employee=data
    },  
    
    (error)=>{
      this.toastr.error(error)

    }
    )
  }


  saveWork(form:NgForm){
    if(form.valid){
      console.log(form.value)
    this.work.description=form.value.description
    this.work.duration= form.value.duration;
    this.work.startTime=form.value.startTime
    this.work.title=form.value.title

    console.log(this.work)
    this.workService.saveWork(this.work).subscribe((data)=>{
      this.toastr.success("work saved successful!")
      
      form.resetForm();
      this.ngOnInit();

      
      
        
      
      
    },
    (error)=>{
      this.toastr.error("failed to save!")
    })
    }else{
      this.toastr.error("'Form is not valid. Please fill out all required fields.'")
    }
    


  }

  
  loadWorks=()=>{
    this.workService.getWorkByUserId().subscribe((data)=>{
      this.works=data;
      console.log(this.works)

    },
    (error)=>{
      console.log(error)

    }
    )
    
      
  }

deleteTask=(id:Number)=>{

  this.workService.deleteWorkById(id).subscribe(()=>{
    this.toastr.success("work deleted !")
    this.ngOnInit()
  },
  (error)=>{
    this.toastr.error("unkown error !")

  })

}
updateWork=(work :WorkResponse)=>{
  this.selectedWork =work; 
  const modalRef = this.modalService.open(ModalComponent, {
    

  });
  modalRef.componentInstance.work = work;



}




}
