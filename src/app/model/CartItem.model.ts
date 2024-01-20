import { Haj } from "./Haj.model";



export interface CartItemDTO {
  id?: number;
  haj: Haj;
  invoiceId: number; // Add the invoiceId field
  quantityAd?: number;
  quantityVen?: number;
  sessionIdentifier?: string;
}
  
