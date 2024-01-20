import { RoomType } from './room-type.model';
import { ReservationOption } from './reservation-option.model';

export interface Hotel {
  hotelId?: number;
  hotelName: string;
  adresse: string;
  location:string;
  priceAb:string;
  numberOfStars:number;
  roomTypes: RoomType[];
  reservationOptions: ReservationOption[];
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
  image7: string;
  image8: string;
  image9: string;
  image10: string;
}
