import { PaymentMethod } from "./PaymentMethod.model";

export interface Invoice {

  invId?:number;

  hotelName?:  string ;
  typeRoom?: string ;
  viewOfMakkah?: boolean ;
  numbnuit?: number ;

  numberOfAdults?: number ;
  numberOfChildren?: number ;
  numberOfB?: number ;
  dateRes?: string;
  optionName?: string ;
  
  paymentMethod: PaymentMethod;
    firstName: string;
    lastName: string;
    companyName?: string;
    country: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    codePostal: string;
    hajName : string;
    number: string;
    email: string;
    quantityAd: number, // Initialize with 0
    quantityVen: number, // Initialize with 0
    totalPrice: number// Initialize with 0
  }
  