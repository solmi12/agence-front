import { Component } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { HajServiceService } from '../services/haj-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showNowTrueList: Haj[] = [];
  showNowFalseList: Haj[] = [];

  constructor(private hajService: HajServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchHajWithShowNowTrue();
    this.fetchHajWithShowNowFalse();
  }

  fetchHajWithShowNowTrue() {
    this.hajService.getHajWithShowNowTrue().subscribe(
      (data: Haj[]) => {
        this.showNowTrueList = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching Haj with showNow=true:', error);
      }
    );
  }

  fetchHajWithShowNowFalse() {
    this.hajService.getHajWithShowNowFalse().subscribe(
      (data: Haj[]) => {
        this.showNowFalseList = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching Haj with showNow=false:', error);
      }
    );
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
