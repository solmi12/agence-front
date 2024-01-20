import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemDTO } from '../model/CartItem.model';
import {CartSummary} from '../model/CartView.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  addToCart(cartItem: CartItemDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, cartItem);
  }
  getCartView(): Observable<CartSummary> {
    return this.http.get<CartSummary>(`${this.apiUrl}/view`).pipe(
      map((cartViewDTO: any) => {
        const cartItems: CartItemDTO[] = Array.isArray(cartViewDTO.cartItems)
          ? cartViewDTO.cartItems.map((item: any) => {
            return {
              id: item.id,
              // Map properties based on the structure of CartItem
              haj: item.haj,
              quantityAd: item.quantityAd,
              quantityVen: item.quantityVen
            };
          })
          : [];
  
        return {
          totalPriceCart: cartViewDTO.totalPriceCart,
          totalQuantityAd: cartViewDTO.totalQuantityAd,
          totalQuantityVen: cartViewDTO.totalQuantityVen,
          items: cartItems
        };
      })
    );
  }
  deleteCartItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }
  

  updateCartItem(updatedCartItem: CartItemDTO): Observable<string> {
    // Set the headers with content type application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Modify the URL to include the cartItemId if needed
    const url = `${this.apiUrl}/update`;

    return this.http.put<string>(url, updatedCartItem);
  }
  
  
  clearCart(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/clear`, {});
  }
}
