import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,private route:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const role = this.jwtHelper.decodeToken(token).role;

      const requiredRole = route.data['requiredRole'];

      if (role === requiredRole) {
        return true;
      }else {
        // Redirect based on user's role and destination
        if (role === 'EMPLOYER' && requiredRole === 'ADMIN') {
          this.route.navigate(['profile']); // Redirect employer to profile
        } else if (role === 'ADMIN' && requiredRole === 'EMPLOYER') {

          this.route.navigate(['adminProfile']); // Redirect admin to adminProfile
        }
      }
      
    
     
      
    }
    if (!token || this.jwtHelper.isTokenExpired(token)){
      this.route.navigate(['login']);


    }


    return false; 
  }
}