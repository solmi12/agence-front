import { Injectable } from '@angular/core';
import { RoomReservationChoice } from '../model/RoomReservationChoice.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private reservation: RoomReservationChoice | null = null;
  private hotelName: string | null = null;
  private optionName : string | null = null;
  private typeRoom : string | null = null;
  
  constructor() { }
  setReservation(reservation: RoomReservationChoice) {
    this.reservation = reservation;
  }
  getReservation(): RoomReservationChoice | null {
    return this.reservation;
  }

  setHotelName(hotelName: string) {
    this.hotelName = hotelName;
  }
  setOptionName(optionName: string){
    this.optionName = optionName;
  }

  setTypeRoom(typeRoom : string){
    this.typeRoom = typeRoom;
  }
  getOptionName(): string | null {
    return this.optionName;
  }
  getTypeRoom(): string | null {
    return this.typeRoom;
  }

  getHotelName(): string | null {
    return this.hotelName;
  }
}
