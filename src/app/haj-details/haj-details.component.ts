import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Haj } from '../model/Haj.model';
import { HajServiceService } from '../services/haj-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-haj-details',
  templateUrl: './haj-details.component.html',
  styleUrls: ['./haj-details.component.css'],
})
export class HajDetailsComponent implements OnInit {
  haj: Haj | null = null;
  quantityAd: number = 1; // Set the default quantityAd to 1
  quantityVen: number = 0;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private hajService: HajServiceService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const hajId = +params['hajId'];
      this.hajService.getHajById(hajId).subscribe((haj: Haj) => {
        this.haj = haj;
        this.isLoading = false;
        console.log('Haj details:', this.haj); // Debugging line to check the haj object
      });
    });
  }
  addToCart() {
    if (!this.haj) {
      console.error('Invalid product');
      return;
    }
  
    // Create a CartItem object with the product and quantities
    const cartItem = {
      haj: this.haj,
      quantityAd: this.quantityAd,
      quantityVen: this.quantityVen,
      invoiceId :0
    };
  
    // Add the selected product to the cart with specific quantities
    this.cartService.addToCart(cartItem).subscribe(
      () => {
        console.log('Product added to cart');
        // Navigate to ShopDetailsComponent with the haj object in state
        this.router.navigate(['/shopdetails'], { state: { haj: this.haj } });
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        // Handle the error and provide user feedback
      }
    );
  }
}
