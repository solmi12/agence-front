import { CartItemDTO } from "./CartItem.model";

export interface CartSummary {
    totalQuantityAd: number;
    totalQuantityVen: number;
    totalPriceCart?: number;
    items: CartItemDTO[];
  }
  