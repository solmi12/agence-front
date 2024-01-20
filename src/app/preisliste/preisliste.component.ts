import { Component } from '@angular/core';
import { Hotel } from '../model/Hotels.model';
import { HotelsService } from '../services/hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preisliste',
  templateUrl: './preisliste.component.html',
  styleUrls: ['./preisliste.component.css']
})
export class PreislisteComponent {

  hotels: Hotel[] = [];
  constructor(private hotelService: HotelsService  , private router: Router) {}
  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotels = hotels;
      console.log(this.hotels); // Log the data after assignment
    }, (error) => {
      // Handle error, e.g., display an error message
    });
}
viewHotelDetails(hotelId: number) {
  // Use the router to navigate to the HotelDetailsComponent with the hotelId as a parameter
  this.router.navigate(['Hotels', hotelId]);
}

generateStars(numberOfStars: number): string {
  return '★'.repeat(numberOfStars);
}
}