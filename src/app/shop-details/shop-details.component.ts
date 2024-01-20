import { Component, OnInit } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { CartService } from '../services/cart.service';
import { CartSummary } from '../model/CartView.model';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  haj: Haj | null = null;
  cartQuantityAd: number = 1; // Set the default quantityAd to 1
  cartQuantityVen: number = 0;

  invoiceId : number=0;
  totalPrice: number = 0;
  adultQuantity: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    const state = window.history.state;

    if (state && state.haj) {
      this.haj = state.haj;

      if (this.haj!.priceAd != null) {
        this.totalPrice = this.haj!.priceAd;
      }
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    // Ensure cartQuantityAd and cartQuantityVen are >= 0
    if (this.cartQuantityAd < 0) {
      this.cartQuantityAd = 0;
    }
    if (this.cartQuantityVen < 0) {
      this.cartQuantityVen = 0;
    }

    // Calculate total price
    this.totalPrice =
     1*this.haj!.priceAd+ this.haj!.priceAd * this.cartQuantityAd + this.haj!.priceVen * this.cartQuantityVen;
  }
  updateCartItem() {
 
    if (this.haj && this.haj.hajId) { // Ensure haj and haj.id exist
  
      const updatedCartItem = {
        quantityAd: this.cartQuantityAd+1,
        quantityVen: this.cartQuantityVen,
        haj: this.haj,
        invoiceId :0
      };
  
      // Do not pass the headers
      this.cartService.updateCartItem(updatedCartItem).subscribe(
        () => {
          console.log('CartItem updated successfully');
          this.router.navigate(['/Cart']);
          console.log('Updated Cart Item:', updatedCartItem);

        },
        (error) => {
          console.error('Error updating CartItem:', error);
          // Handle the error and provide user feedback
        }
      );
    }
  }
  

}
