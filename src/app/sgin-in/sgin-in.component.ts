import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-sgin-in',
  templateUrl: './sgin-in.component.html',
  styleUrls: ['./sgin-in.component.scss']
})
export class SginInComponent {

  email!: string;
  password!: string;

  constructor(private jwtHelper:JwtHelperService,private route:Router,private loginService: AuthService,private toastr: ToastrService) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
        const userId=response.idUser
        this.loginService.updateAuthState(true,this.jwtHelper.decodeToken(token).role , this.jwtHelper.decodeToken(token).sub);

    
      

       

        
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId.toString());

        this.toastr.success("login successful!")
        this.route.navigate(["adminDashbord"])
        

      },
      error => {
        if (error.status === 401) {
          this.toastr.error('Invalid credentials. Please check your email and password.');
        } else if (error.status === 409) {
          this.toastr.error('Account already exists.');
        } else {
          this.toastr.error('An unknown error occurred. Please try again later.');
        }
      
    
      }
    );
  }

}
