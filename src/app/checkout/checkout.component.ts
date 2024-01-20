  import { Component, OnInit } from '@angular/core';
  import { CartItemDTO } from '../model/CartItem.model';
  import { Invoice} from '../model/Invoice.model';
  import { CartService } from '../services/cart.service';
  import { InvoiceService } from '../services/invoice.service';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CartSummary } from '../model/CartView.model';
  import { PaymentMethod } from '../model/PaymentMethod.model';
  import { DataSharingService } from '../services/data-sharing.service';
  import { Hotel } from '../model/Hotels.model';
  import { RoomType } from '../model/room-type.model';
  import { ReservationOption } from '../model/reservation-option.model';
  import { ReservationService } from '../services/reservation.service';
  import { RoomReservationChoice } from '../model/RoomReservationChoice.model';
  import { forkJoin, take, timer } from 'rxjs';
  import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
  })
  export class CheckoutComponent implements OnInit {
    cartItems: CartItemDTO[] = [];

    invoice: Invoice = {
      paymentMethod: PaymentMethod.PAYPAL,
      firstName: '',
      lastName: '',
      companyName: '', // Add new property
      country: '',
      street: '',
      apartment: '', // Add new property
      city: '',
      state: '',
      codePostal: '',
      hajName: '',
      number: '',
      email: '',
      quantityAd: 0,
      quantityVen: 0,
      totalPrice: 0,
      hotelName: '', // Add new property
      typeRoom: '', // Add new property
      viewOfMakkah: false, // Add new property
      numbnuit: 0, // Add new property
      numberOfAdults: 0, // Add new property
      numberOfChildren: 0, // Add new property
      numberOfB: 0, // Add new property
      dateRes: '', // Add new property
      optionName: '', // Add new property
    };
    loadingReservations: boolean = true;
    selectedReservationOption: ReservationOption | undefined;

    selectedRoomType: RoomType | undefined;
    cartView!: CartSummary;
    countries: string[] = [];
    totalPrice: number = 0;
    reservations: RoomReservationChoice[] = [];
    totalPriceRes: number = 0;
    totalPriceCart: number = 0;
    reservation: any; 
    constructor(
      private cartService: CartService,
      private invoiceService: InvoiceService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private reservationService: ReservationService,
    ) {}
    ngOnInit(): void {
      // Fetch the list of countries from the service
      this.invoiceService.getCountries().then((countries) => {
        this.countries = countries;
        this.invoice.country = 'Germany';
      });
    
      // Retrieve cartItems from the route's state
      this.route.paramMap.subscribe((params) => {
        const cartItems = params.get('cartItems');
        if (cartItems) {
          this.cartItems = JSON.parse(cartItems);
          console.log('Cart Items from Route:', this.cartItems);
          // Calculate totals when cartItems are available
          this.calculateTotals();
        } else {
          // Fetch cart items if they are not available in the route's state
          this.loadCartView();
        }
      });

      forkJoin([
        this.invoiceService.getCountries(),
        this.cartService.getCartView(),
        this.reservationService.getReservations()
      ]).subscribe(([countries, cartView, reservations]) => {
        this.countries = countries;
        this.cartView = cartView;
        this.reservations = reservations;
        console.log('Countries:', countries);
        console.log('CartView:', cartView);
        console.log('Reservations:', reservations);
  
        // Calculate totals once all data is available
        this.calculateTotals();
      }, (error) => {
        console.error('Error loading data:', error);
      });
      this.getReservations();
    console.log(this.reservation)
    
  
    
      }
    
    
      getReservations(): void {
        this.loadingReservations = true;
      
        this.reservationService.getReservations().subscribe(
          (reservations) => {
            // Handle the response and set your data
            this.reservations = reservations;
            console.log('reservation', reservations);
        
            // Select a specific reservation from the array
            if (reservations && reservations.length > 0) {
              this.reservation = reservations[0]; // Assuming you want the first reservation
              this.calculateTotals(); // Calculate totals after setting the reservation
            } else {
              // Handle the case where no reservations are available
            }
            
            this.loadingReservations = false; // Set it to false after receiving the response
          },
          (error) => {
            console.error('Error fetching reservations:', error);
            this.loadingReservations = false; // Make sure to set it to false in case of an error
          }
        );
      }
      
      showSuccessMessage(message: string): void {
        this.snackBar.open(message, 'Close', {
          duration: 3000, // Adjust the duration as needed
        });
      }
      
    
    loadCartView() {
      this.cartService.getCartView().subscribe(
        (cartView: CartSummary) => {
          console.log('CartView from API:', cartView);
          this.cartView = cartView;
    
          // Check if cart items exist and are an array
          if (Array.isArray(cartView.items)) {
            this.cartItems = cartView.items;
            this.totalPriceCart = cartView.totalPriceCart!;
            this.invoice.quantityAd = cartView.totalQuantityAd || 0;
            this.invoice.quantityVen = cartView.totalQuantityVen || 0;
            if (this.cartItems.length > 0) {
              this.invoice.hajName = this.cartItems[0]?.haj?.hajName || '';
            }
    
    
          }
    
          console.log('Cart Items:', this.cartItems);
          console.log('Total PriceCart:', this.totalPriceCart);
        },
        (error) => {
          console.error('Error loading cart view:', error);
        }
      );
    }
    

    
    calculateTotals(): void {
      console.log('Calculating totals...');
    
      if (this.cartView && this.reservation) {
        this.invoice.totalPrice = this.cartView.totalPriceCart + this.reservation.totalpriceRes;
    
        if (
          this.reservation.roomTypes &&
          this.reservation.roomTypes.length > 0 &&
          this.reservation.reservationOptions &&
          this.reservation.reservationOptions.length > 0
        ) {
          this.invoice.hotelName = this.reservation.hotelNamee || '';
          this.invoice.typeRoom = this.reservation.roomTypes[0].typeRoom || '';
          this.invoice.viewOfMakkah = this.reservation.viewOfMakkah || false;
          this.invoice.numbnuit = this.reservation.numbnuit || 0;
          this.invoice.numberOfAdults = this.reservation.numberOfAdults || 0;
          this.invoice.numberOfChildren = this.reservation.numberOfChildren || 0;
          this.invoice.numberOfB = this.reservation.numberOfB || 0;
          this.invoice.dateRes = this.reservation.dateRes || '';
          this.invoice.optionName = this.reservation.reservationOptions[0].optionName || '';
        }
      } else if (this.cartView) {
        this.invoice.totalPrice = this.cartView.totalPriceCart ?? 0;
      } else if (this.reservation) {
        this.invoice.totalPrice = this.reservation.totalpriceRes;
      } else {
        this.invoice.totalPrice = 0;
      }
    
      console.log('totalPrice:', this.invoice.totalPrice);
    }
    
    
    
    
    
    

    submitInvoice(): void {
      if (this.invoice.paymentMethod === 'paypal') {
        // Handle PayPal payment
        // Set the hajName in the invoice
        this.invoice.hajName = this.cartItems[0]?.haj?.hajName || '';
    
        // Call the invoice service to create the invoice
        this.invoiceService.createInvoice(this.invoice).subscribe(
          (response: any) => {
            if (response.approvalUrl) {
              const approvalUrl = response.approvalUrl;
              console.log('Approval URL:', approvalUrl);
              window.location.href = approvalUrl;
            } else if (response.error) {
              console.error('Error creating invoice:', response.error);
              // Display the error message to the user, e.g., by showing it in the UI
            } else {
              console.error('Unexpected response:', response);
            }
          },
          (error) => {
            console.error('Error creating invoice:', error);
            // Handle the error, e.g., display an error message to the user
          },
          () => {
            // Display a success message using Angular Material Snackbar
            this.showSuccessMessage('Invoice created successfully');
          }
        );
      } else {
        // For other payment methods (e.g., in_person, transfer), simply create and add the invoice to the database
        this.invoiceService.createInvoice(this.invoice).subscribe(
          (response: any) => {
            console.log('Invoice created:', response);
            // Handle success or any other logic here
          },
          (error) => {
            console.error('Error creating invoice:', error);
            // Handle the error, e.g., display an error message to the user
          },
          () => {
            // Display a success message using Angular Material Snackbar
            this.showSuccessMessage('Invoice created successfully');
          }
        );
      }
    }
    
    


    redirectToPayPal(invoiceId: number, totalPrice: number): void {
      const formattedTotalPrice = totalPrice.toFixed(2);
      const payPalUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';

      const params = new URLSearchParams();
      params.set('cmd', '_xclick');
      params.set('business', 'solmimohamed@gmail.com');
      params.set('item_name', 'Invoice Payment');
      params.set('amount', formattedTotalPrice);
      params.set('currency_code', 'EUR');
      params.set('invoice', invoiceId.toString());
      params.set('return', 'http://localhost:4200/home');
      params.set('cancel_return', 'http://localhost:4200/home');

      const paymentUrl = `${payPalUrl}?${params.toString()}`;
      window.location.href = paymentUrl;
    }
    
    findHajNameByHajId(hajId: number): string {
      const cartItem = this.cartItems.find(
        (item) => item.haj?.hajId === hajId
      );
      return cartItem ? cartItem.haj?.hajName || '' : '';
    }
  }
