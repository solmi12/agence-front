import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CartItemDTO } from '../model/CartItem.model';
import { CartService } from '../services/cart.service';
import { NavigationExtras, Router } from '@angular/router';
import { CartSummary } from '../model/CartView.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartItems: CartItemDTO[] = [];
  totalPriceCart: number = 0;
  totalQuantityAd: number = 0;
  totalQuantityVen: number = 0;
  cartView!: CartSummary;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.loadCartView();
  }

  deleteCartItem(cartItem: CartItemDTO) {
    if (typeof cartItem.id !== 'number' || isNaN(cartItem.id)) {
      console.error('Invalid ID:', cartItem.id);
      return;
    }
  
    const id = cartItem.id;
    console.log('Deleting cart item with ID:', id);
    this.cartService.deleteCartItem(id).subscribe(
      (cartView: CartSummary) => {
        console.log('Cart item deleted successfully');
  
        // Find and remove the deleted item from cartItems
        const deletedIndex = this.cartItems.findIndex(item => item.id === cartItem.id);
        if (deletedIndex !== -1) {
          this.cartItems.splice(deletedIndex, 1);
        }
  
        // Update totalPrice based on the remaining items
        this.totalPriceCart = cartView.totalPriceCart!;
  
        this.cdr.markForCheck(); // Trigger change detection
      },
      (error) => {
        console.error('Error deleting cart item:', error);
      }
    );
  }
  

  loadCartView() {
    this.cartService.getCartView().subscribe(
      (cartView: CartSummary) => {
        console.log('CartView from API:', cartView);
        this.cartView = cartView;
        this.cartItems = cartView.items;
        this.totalPriceCart = cartView.totalPriceCart!;
        this.cdr.markForCheck(); // Trigger change detection after updating data
      },
      (error) => {
        console.error('Error loading cart view:', error);
      }
    );
  }

  navigateToCheckout(): void {
    // Navigate to the checkout component and send cartItems as state
    const navigationExtras: NavigationExtras = {
      state: {
        cartItems: this.cartItems
      }
    };
    this.router.navigate(['/Checkout'], navigationExtras);
  }
}
