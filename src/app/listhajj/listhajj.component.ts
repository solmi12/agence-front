// listhajj.component.ts
import { Component, OnInit } from '@angular/core';
import { HajServiceService } from '../services/haj-service.service';
import { Haj } from '../model/Haj.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listhajj',
  templateUrl: './listhajj.component.html',
  styleUrls: ['./listhajj.component.css']
})
export class ListhajjComponent implements OnInit {
  hajList: Haj[] = [];
  categoryFilter: string = 'HAJJ';

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
