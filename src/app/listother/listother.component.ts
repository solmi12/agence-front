import { Component, OnInit } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { HajServiceService } from '../services/haj-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listother',
  templateUrl: './listother.component.html',
  styleUrls: ['./listother.component.css']
})
export class ListotherComponent   implements OnInit{
  hajList: Haj[] = [];
  categoryFilter: string = ' OTHER';
  constructor(private hajService: HajServiceService,private router: Router) {}

  ngOnInit() {
    this.getHajItemsByCategory(this.categoryFilter);
  }
  getHajItemsByCategory(category: string): void {
    this.hajService.getHajByCategory(category)
      .subscribe(data => {
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
