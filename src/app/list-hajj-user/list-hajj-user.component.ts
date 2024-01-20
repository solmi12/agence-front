import { Component, OnInit } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { HajServiceService } from '../services/haj-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hajj-user',
  templateUrl: './list-hajj-user.component.html',
  styleUrls: ['./list-hajj-user.component.css']
})
export class ListHajjUserComponent implements OnInit{


  hajList: Haj[] = [];
  constructor(private hajService: HajServiceService,
    private router: Router) {}



  ngOnInit(): void {
    this.loadHajList();
  
  }

  loadHajList() {
    this.hajService.getAllHaj().subscribe((data) => {
      console.log('Response from service:', data); 
      this.hajList = data;
    });
  }

  navigateToDetails(hajId: number | null): void {
    if (hajId !== null && hajId !== 0) {
      // Navigate to the hajDetails component with the selected hajId
      this.router.navigate(['/hajDetails', hajId]);
      console.log(hajId);
    } else {
      // Handle the case where hajId is null or 0 (optional)
    }
    console.log(hajId)
  }
  

}
