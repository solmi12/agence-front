import { Component, OnInit } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { HajServiceService } from '../services/haj-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-hajj-admin',
  templateUrl: './list-hajj-admin.component.html',
  styleUrls: ['./list-hajj-admin.component.css']
})
export class ListHajjAdminComponent implements OnInit {
  hajList: Haj[] = [];
  
  constructor(private hajService: HajServiceService,private router: Router,private toastr: ToastrService) {
    this.hajList = [];
  }
  ngOnInit() {
    // Load the list of Haj items when the component initializes
    this.loadHajList();
  }
  loadHajList() {
    this.hajService.getAllHaj().subscribe(
      (hajList) => {
        this.hajList = hajList;
      },
      (error) => {
        console.error('Error loading Haj list: ', error);
      }
    );
  }
  deleteHaj(hajId: number) {
    if (confirm('Are you sure you want to delete this Haj?')) {
      this.hajService.deleteHaj(hajId, { responseType: 'text' }).subscribe(
        (response) => {
          console.log(response);
  
          // Remove the deleted Haj from the local list
          const deletedIndex = this.hajList.findIndex((haj) => haj.hajId === hajId);
          if (deletedIndex !== -1) {
            this.hajList.splice(deletedIndex, 1);
          }
  
          this.toastr.success('Haj deleted successfully.');
        },
        (error) => {
          console.error('Error deleting Haj: ', error);
        }
      );
    }
  }
  
  
  updateHaj(hajId: number) {
    // Navigate to the UpdateHajComponent and pass the hajId as a route parameter
    this.router.navigate(['/update-haj', hajId]);
  }
  
}
