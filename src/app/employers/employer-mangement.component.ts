import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee-service.service';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeRegister } from '../model/EmployeeRegister.model';

@Component({
  selector: 'app-employer-mangement',
  templateUrl: './employer-mangement.component.html',
  styleUrls: ['./employer-mangement.component.css']
})
export class EmployerMangementComponent implements OnInit{
  public employees!: EmployeeRegister[];
  public searchVal:any;
  public filteredEmployees!: EmployeeRegister[]; 
  constructor(private employeeService:EmployeeService,private toastr: ToastrService ,private router: Router, private route: ActivatedRoute  ){}
  ngOnInit(): void {
    this.loadEmployees()

     }
     loadEmployees(): void {
      this.employeeService.getAllEmployees().subscribe((data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.convertImageDatatoUrl();
      },
      (error) => {
        console.log(error);
      });
      
    }
  
    convertImageDatatoUrl(): void {
      this.employees.forEach((employee) => {
        const imageDataUrl = 'data:image/jpeg;base64,' + employee.imageUrl;
        employee.imageUrl = imageDataUrl;
      });
    }



    search=()=>{
      
     this.filteredEmployees= this.employees.filter(empl=>empl.firstname.toLowerCase().startsWith(this.searchVal.toLowerCase()))
      console.log(this.filteredEmployees[0])
      
      
    }

    deleteEmpl(id:number){

     
      console.log(confirm("delate me ??"))
      if (confirm("delate this employee ??")) {
        
        this.employeeService.deleteEmployee(id).subscribe(
          () => {
            console.log('Employee deleted successfully');
            this.loadEmployees()
            this.toastr.success("emlpoyee dleted !")

          },
          (error) => {
            console.error('Error deleting employee:', error);
            this.toastr.error("delete employee failed  !")
          }
        );
      } else {
        console.log('Employee delete action canceled');
      }
    
     
    }

    updateEmployee(employee: EmployeeRegister) {
      this.router.navigate(['/updateEmployee', employee.userId], { state: { employee: employee } });
    }


  }


