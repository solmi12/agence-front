import { Component, OnInit } from '@angular/core';
import { WorkService } from '../services/work.service';
import { WorkResponse } from '../model/WorkResponse';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements  OnInit{
  works!:WorkResponse[]
  visibleWorks!: any[]; // Array to store the first 15 works
  showMore: boolean = false;
  searchDate!: Date;
  constructor(private workService :WorkService){
    this.searchDate = new Date();
  }

  ngOnInit(): void {
    this.loadWorks()
   
    
  }


  loadWorks=()=>{

    this.workService.getAllWorkByUserId().subscribe((data)=>{
      this.works=data
      if (this.showMore) {
        this.visibleWorks = this.works;
      } else {
        this.visibleWorks = this.works.slice(0, 15);
      }


    },

    (error)=>{
      console.log(error)
    }
    )
  }
  toggleShowMore() {
    this.showMore = !this.showMore;

    if (this.showMore) {
      this.visibleWorks = this.works;  
    } else {
      this.visibleWorks = this.works.slice(0, 15);    
    }
  }

  onSearch() {
    if (this.searchDate) {
      this.visibleWorks = this.works.filter((work) => {
        const workDate = new Date(work.startTime);
        const srchdate=new Date(this.searchDate)
        console.log("srchdate===>"+srchdate)
        console.log("workDate===>"+workDate)
       
        return (
          workDate.getFullYear() === srchdate.getFullYear() &&
          workDate.getMonth() ===srchdate.getMonth() &&
          workDate.getDate() === srchdate.getDate()
        );
      });
    } else {
      
      this.loadWorks();
    }
  }
}
