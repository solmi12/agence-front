import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { EmployeeService } from "../services/employee-service.service";
import { trigger } from "@angular/animations";

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
  animations: [
    trigger('flyInOut', [
      // Animation definition goes here
    ])
  ]
})
export class RegisterEmployeeComponent {
  employee: any = {}; // instance of the EmployeeRegister model
  @ViewChild('fileInput', { static: false }) fileInput!: any;

  constructor(private registerService: EmployeeService, private toastr: ToastrService) {}

  onImageChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.employee.imageUrl = event.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
 
  register(form: NgForm) {
    // Get the file from fileInput
    const file: File = this.fileInput.nativeElement.files[0];
  
    // If you want to use the form values, you can do so like this
    this.employee.firstname = form.value.firstname;
    this.employee.lastName = form.value.lastName;
    this.employee.email = form.value.email;
    this.employee.password = form.value.password;
    this.employee.birthDay = form.value.birthDay;
    this.employee.role = form.value.role;
  
    if (file) {
      this.onImageChange({ target: this.fileInput.nativeElement });
    }
  
    this.registerService.registerEmployee(this.employee).subscribe(
      (response) => {
        // Check if the response is a string (plain text)
        if (typeof response === 'string') {
          // Assuming "Employee registered successfully." is the plain text response
          this.toastr.success(response);
        } else {
          // Handle other types of responses or adjust as needed
          this.toastr.success('Employee registered successfully');
        }
      },
      (error) => {
        console.error('Error registering employee:', error);
  
        // Check if the error is a string (plain text)
        if (error.error && typeof error.error === 'string') {
          this.toastr.error(error.error); // Display the error message
        } else {
          this.toastr.error('An error occurred while registering the employee.');
        }
      }
    );
  }
  
  
  
}
