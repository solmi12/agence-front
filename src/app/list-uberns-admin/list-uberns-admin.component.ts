import { Component, OnInit } from '@angular/core';
import { Uberns } from '../model/Uberns.model';
import { UbernsService } from '../services/uberns.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-uberns-admin',
  templateUrl: './list-uberns-admin.component.html',
  styleUrls: ['./list-uberns-admin.component.css']
})
export class ListUbernsAdminComponent implements OnInit{
  uberuns: Uberns[] = [];
  isAdmin: boolean = true;
  constructor(private ubernsService: UbernsService,
    private authService:AuthService){}


  ngOnInit(): void {
    this.ubernsService.getAllUberns().subscribe((data) => {
      this.uberuns = data;
      console.log(data)
    });
    this.authService.initAuthState().then(() => {

      this.isAdmin = this.authService.hasRole('ADMIN');
      console.log(this.isAdmin)
    });
    
  }
  deleteUberns(ubernsId: number) {
    this.ubernsService.deleteUberns(ubernsId).subscribe(() => {
      // Update the data after deletion
      this.uberuns = this.uberuns.filter((item) => item.uberId !== ubernsId);
    });
  }
}
