import { Component } from '@angular/core';
import { Hotel } from '../model/Hotels.model';
import { HotelsService } from '../services/hotels.service';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent {
  hotels: Hotel[] = [];
  constructor(private hotelService: HotelsService) {}
  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotels = hotels;
      console.log(this.hotels); // Log the data after assignment
    }, (error) => {
      // Handle error, e.g., display an error message
    });
  }
  
  onDelete(hotelId: number): void {
    this.hotelService.deleteHotel(hotelId).subscribe(() => {
      // Handle success, e.g., show a success message
      this.hotels = this.hotels.filter(hotel => hotel.hotelId !== hotelId);
    }, (error) => {
      // Handle error, e.g., display an error message
    });
  }
    
}
