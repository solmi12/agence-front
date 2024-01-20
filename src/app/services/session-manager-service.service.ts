import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from '../model/CartItem.model';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerServiceService {

  private sessionMap = new Map<string, Cart>();
  constructor(private cookieService: CookieService) { }
  getOrCreateCart(sessionId: string): Cart {
    let cart = this.sessionMap.get(sessionId);
    if (!cart) {
      cart = new Cart(); // Create a new cart
      this.sessionMap.set(sessionId, cart);
    }
    return cart;
  }
}
