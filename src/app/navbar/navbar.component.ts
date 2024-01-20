import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EmployeeService } from '../services/employee-service.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy  {

  admin = false;
  employee = false;
  email: string | null = null;
  isLoggedIn: boolean = false;
  private loggedInSubscription: Subscription | undefined;
  private userRoleSubscription: Subscription | undefined;
  private userEmailSubscription: Subscription | undefined;



  constructor(private authService:AuthService,private jwtHelper: JwtHelperService,private toaster:ToastrService, private activatedRoute: ActivatedRoute,private router: Router,private employeeService:EmployeeService) { 
  
  
  }

  ngOnInit(): void {
    console.log(this.employee)
   
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.isLoggedIn = loggedIn;
        this.userRoleSubscription = this.authService.userRole$.subscribe(role => {
          this.admin = role === 'ADMIN';
          this.employee = role === 'EMPLOYER';
        });
        this.userEmailSubscription = this.authService.userEmail$.subscribe(email => {
          this.email = email;
        });
      } else {
        this.admin = false;
        this.employee = false;
        this.email = null;
        if (this.userRoleSubscription) {
          this.userRoleSubscription.unsubscribe();
        }
        if (this.userEmailSubscription) {
          this.userEmailSubscription.unsubscribe();
        }
      }
    });
  
  }
    
    
  


  logout(): void {
    this.isLoggedIn=false
   this.authService.logout()
  }
  ngOnDestroy(): void {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
    if (this.userEmailSubscription) {
      this.userEmailSubscription.unsubscribe();
    }
  }

}
