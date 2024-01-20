import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDateRangeInput } from '@angular/material/datepicker';

import { DateRange, MatCalendarCellClassFunction, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LeaveRequest } from '../model/LeaveRequest.model';
import { LeaveRequestService } from '../services/leave-request.service';
import { ToastrService } from 'ngx-toastr';
import { LeaveResponse } from '../model/LeaveResponse';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  
  startDate: any;
  endDate: any;
  startAt: Date = new Date(); 
  leaveRequests!:LeaveResponse[]
  actif:string = 'PENDING'

  leaveRequest:LeaveRequest={
    debutDate: '',
    finDate: ''
  }
  ngOnInit(): void {
    this.loadLeaveRequests()
    

  }

  constructor(private leaveRequestService:LeaveRequestService,private toaster:ToastrService){}

  //to make  this month and the next  selectable

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentday= now.getDay();
    const firstDayOfMonth = new Date(currentYear, currentMonth, currentday-1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 2, 0);

    return date > firstDayOfMonth && date < lastDayOfMonth;


  };

  //for color the available date
  dateClass: MatCalendarCellClassFunction<Date> = (date: Date) => {
    return this.dateFilter(date) ? 'custom-green' : 'custom-red';
  };
 
  submit=()=>{
   
    this.leaveRequest.debutDate=this.startDate
    this.leaveRequest.finDate=this.endDate
    console.log(this.leaveRequest)
    if(this.startDate!=undefined && this.endDate!=undefined){
      
      this.leaveRequestService.sendLeaveRequest(this.leaveRequest).subscribe((data)=>{
        this.toaster.success(" request sent successfuly")
        this.loadLeaveRequests()
      },(error)=>{
        this.toaster.error("failed to send !")
  
      })

    }else{
      this.toaster.error("select valid date ")
    }
    

  }
  transformDateFormat(dateStr: string): string {
    const dateParts = dateStr.split('/');
    const month = dateParts[0].length === 1 ? '0' + dateParts[0] : dateParts[0];
    const day = dateParts[1].length === 1 ? '0' + dateParts[1] : dateParts[1];
    const year = dateParts[2];
    return `${year}-${month}-${day}`;
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.startDate=this.transformDateFormat(dateRangeStart.value);
    this.endDate=this.transformDateFormat(dateRangeEnd.value)
  }
loadLeaveRequests=()=>{
  return this.leaveRequestService.getLastLeaveRequest().subscribe((data)=>{
    this.leaveRequests=data
    console.log(data)
    

  },(error)=>{
    console.log(error)
  })
}
selectBg(accepted: string): string {
  
  if (accepted === 'ACCEPTED') {
    return 'bg-c-green';
  } else if (accepted === 'REJECTED') {
    return 'bg-c-red';
  }else if(accepted==='PENDING'){
    return "bg-c-yellow"

  }else {
    return ''; 
  }
}

isActif(state:any):boolean{
  if(state==="PENDING"){
    return true
  }else{
    return false
  }

}
deleteRequest=(id:any)=>{
  this.leaveRequestService.deleteById(id).subscribe(()=>{
    this.toaster.success("Leave Request deleted successfuly")
    this.loadLeaveRequests()
  },
  (error)=>{
    this.toaster.error("failed to delete Leave Request")
  })

}

}
