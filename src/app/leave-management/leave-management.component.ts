import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveManegement } from '../model/LeaveMangement.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit{
  public searchVal:any;
   leaveRequests!:LeaveManegement[]
  filteredLeaveRequests: LeaveManegement[]=[];
  constructor(private leaveRequestService:LeaveRequestService,private toaster:ToastrService){}
  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveRequestService.getAllPendingLeaveRequest().subscribe((data) => {
      this.leaveRequests = data;
      this.filteredLeaveRequests = data;
      this.convertImageDatatoUrl();
    },
    (error) => {
      console.log(error);
    });
  }

  convertImageDatatoUrl(): void {
    this.leaveRequests.forEach((leaveRequest) => {
      const imageDataUrl = 'data:image/jpeg;base64,' + leaveRequest.employee.imageData;
      leaveRequest.employee.imageData = imageDataUrl;
    });
  }



  search=()=>{
    
   this.filteredLeaveRequests= this.leaveRequests.filter(leave=>leave.employee.firstname.toLowerCase().startsWith(this.searchVal.toLowerCase()))
    
    
    
  }

  accept=(id:any)=>{
    this.leaveRequestService.acceptLeaveRequest(id).subscribe((data)=>{
    this.toaster.success("request accepted ")

      this.loadLeaveRequests()
      

    },
    (error)=>{
      this.toaster.error('error please try later')

    })
  }
  reject=(id:any)=>{
    console.log(id)
    this.leaveRequestService.rejectLeaveRequest(id).subscribe((data)=>{
      this.toaster.success("request rejected ")


      this.loadLeaveRequests()

    },(error)=>{
      this.toaster.error('error please try later')


    })
  }

}
