import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee-service.service';
import { EmployeeRegister } from '../model/EmployeeRegister.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  employee: EmployeeRegister | undefined;
  isSidebarFixed = false;

  isAdmin: boolean = true;
  showUpdateFormFlag = false; 
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployee();
    this.authService.initAuthState().then(() => {

      this.isAdmin = this.authService.hasRole('ADMIN');
      console.log(this.isAdmin)
    });
    
  }

  loadEmployee(): void {
 
    this.employeeService.getEmployeeById().subscribe(
      (data) => {
        this.employee = data;
        console.log(this.employee);
    
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  showUpdateForm(): void {
    this.showUpdateFormFlag = !this.showUpdateFormFlag;
  }
  onImageChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Convert the image data to a base64-encoded string
        this.employee!.imageUrl = event.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  updateEmployee(): void {
    if (this.employee && this.employee.userId) {
      // Create a new object with the updated values
      const updatedEmployee: EmployeeRegister = {
        ...this.employee,
        role: 'ADMIN', // or any other string value you want
      };
  
      this.employeeService.updateEmployee(this.employee.userId, updatedEmployee).subscribe(
        (response) => {
          this.toastr.success(response);
          this.loadEmployee(); // Reload employee data after a successful update
          this.showUpdateFormFlag = false; // Hide the form after successful update
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.toastr.error('An error occurred while updating the employee.');
        }
      );
    } else {
      console.error('Employee data is undefined.');
    }
  }
  
}
