import { ReservationOption } from "./reservation-option.model";
import { RoomType } from "./room-type.model";

export interface RoomReservationChoice {
    resId?: number; // You may omit this if you don't need to set it explicitly.
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfB: number;
    viewOfMakkah: boolean;
    sessionIdentifier?: string;
    numbnuit: number;
    dateRes?: string; // Use JavaScript Date for date properties
  
    hotelNamee?: string ;
    totalpriceRes?: number;
  
    roomTypes: RoomType[]; // List of RoomType
    reservationOptions: ReservationOption[]; // List of ReservationOption
  }