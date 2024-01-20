import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployerComponent } from './update-employer.component';
import { EmployeeService } from '../services/employee-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { employeeRegister } from '../model/EmployeeRegister.model';

describe('UpdateEmployerComponent', () => {
  let component: UpdateEmployerComponent;
  let fixture: ComponentFixture<UpdateEmployerComponent>;

  beforeEach(() => {
    const mockEmployee: employeeRegister = {
      firstname: "undefined",
      lastName: "undefined",
      email: "undefined",
      password: "undefined",
      birthDay: "undefined",
      role: "undefined"
    };

    history.replaceState({ employee: mockEmployee }, '');

    TestBed.configureTestingModule({
      declarations: [UpdateEmployerComponent],
      providers: [EmployeeService,HttpClient],
      imports: [HttpClientModule,  FormsModule, // Import FormsModule or ReactiveFormsModule if used
      ToastrModule.forRoot()],
    });
    fixture = TestBed.createComponent(UpdateEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
