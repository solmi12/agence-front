  import { Component, OnInit } from '@angular/core';
  import { Hotel } from '../model/Hotels.model';
  import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
  import { HotelsService } from '../services/hotels.service';
  import { RoomType } from '../model/room-type.model';
  import { ReservationOption } from '../model/reservation-option.model';
  import { RoomReservationChoice } from '../model/RoomReservationChoice.model';
  import { ReservationService } from '../services/reservation.service';
  import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from '../services/data-sharing.service';
import { RoomTypeService } from '../services/room-type.service';

  @Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
  })
  export class HotelDetailsComponent implements OnInit {
    hotel: Hotel | undefined;
    selectedRoomType: RoomType | undefined;
    numberOfAdults: number = 0;
    numberOfb: number = 0;
    numberOfChildren: number = 0;
    loading: boolean = false;
    formattedDateRes: string | undefined;
    viewOfMakkah: boolean = false;
    selectedReservationOption: ReservationOption | undefined;
    deletionStatus!: string;
    // Arrays for dropdowns
    adultsRange: number[] = Array.from({ length: 6 }, (_, i) => i);
    childrenRange: number[] = Array.from({ length: 6 }, (_, i) => i);
    bRange: number[] = Array.from({ length: 6 }, (_, i) => i);
    nightsRange: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
    arrivalDate: string = ''; // Initialize with the current date
    numberOfNights: number = 1;
    hotelImages: string[] = []; // Array to store hotel images
    reservations: RoomReservationChoice[] = []; // Array to store reservations

    constructor(
      private route: ActivatedRoute,
      private hotelService: HotelsService,
      private reservationService: ReservationService,
      private datePipe: DatePipe,
      private toastr: ToastrService,
      private router: Router,
      private roomTypeService: RoomTypeService
    ) {}

    ngOnInit(): void {
      this.getReservations();
      let hotelId: number;
      let roomTypeId: number; // Define the variables here
    
      this.route.params.subscribe((params) => {
        hotelId = +params['hotelId']; // Assign the hotelId value inside the subscribe function
    
        if (hotelId) {
          this.hotelService.getHotelById(hotelId).subscribe((hotel) => {
            this.hotel = hotel;
    
            if (this.hotel) {
              this.hotelImages = [
                this.hotel.image1,
                this.hotel.image2,
                this.hotel.image3,
                this.hotel.image4,
                this.hotel.image5
              ];
            }
          });
        }
    
        roomTypeId = +params['roomTypeId']; // Assign the roomTypeId value inside the subscribe function
    
        if (roomTypeId) {
          this.roomTypeService.getRoomTypeById(roomTypeId).subscribe((roomType) => {
            this.selectedRoomType = roomType; // Set the selected room type
          });
        }
      });
    }
    
    addReservationAndFetch(): void {
      this.loading = true; // Set loading to true when the button is clicked
      this.addReservation();
    
      // Wait for 30 seconds before calling getReservations
      setTimeout(() => {
        this.getReservations();
        this.loading = false; // Set loading back to false when the data is fetched
      }, 5000);
    }
    

    
    selectedRoomTypeChanged() {
      if (this.selectedRoomType) {
        const maxOccupancy = this.selectedRoomType.maxOccupancy;
        this.numberOfAdults = Math.min(maxOccupancy!, this.numberOfAdults);
        this.numberOfb = Math.min(maxOccupancy! - this.numberOfAdults, this.numberOfb);
        this.numberOfChildren = Math.min(maxOccupancy! - this.numberOfAdults - this.numberOfb, this.numberOfChildren);
      }
    }

    getReservations(): void {
      this.reservationService.getReservations().subscribe(
        (reservations) => {
          this.reservations = reservations; // Assign the retrieved data to your variable
        },
        (error) => {
          console.error('Error fetching reservations:', error);
        }
      );
    }
    deleteRoomReservation() {
      this.reservationService.deleteRoomReservationChoiceBySessionIdentifier().subscribe(
        (response: any) => {
          console.log(response);
    
          if (response.message === 'RoomReservationChoice deleted successfully' && response.sessionIdentifier) {

            // Handle successful deletion
            this.removeDeletedReservationFromUI(response.sessionIdentifier);
    
            // Display a success message using Toastr or any other notification method
            this.toastr.success('Room Reservation deleted successfully.');
          } else {
            // Handle other response messages
            this.deletionStatus = 'Failed to delete Room Reservation';
    
            // Display an error message using Toastr or any other notification method
            this.toastr.error('Failed to delete Room Reservation.');
          }
        },
        (error) => {
          this.deletionStatus = 'Error deleting Room Reservation';
          console.error('Error:', error);
    
          // Display an error message using Toastr or any other notification method
          this.toastr.error('Error deleting Room Reservation.');
        }
      );
    }
    
    
    private removeDeletedReservationFromUI(sessionIdentifier: string) {
      const deletedIndex = this.reservations.findIndex(
        (reservation) => reservation.sessionIdentifier === sessionIdentifier
      );
    
      if (deletedIndex !== -1) {
        this.reservations.splice(deletedIndex, 1);
      }
    }
    
    navigateToCheckout(): void {
      // Prepare the data you want to send
    
    
      this.router.navigate(['/Checkout']);
    }
    

    
    formatDate(dateRes: string): string {
      // Replace 'yyyy-MM-ddTHH:mm:ss.SSSZ' with the actual format of your date string
      return this.datePipe.transform(dateRes, 'dd/MM/yyyy hh:mm a') || '';
    }
    addReservation() {
      const formattedDate = this.datePipe.transform(new Date(this.arrivalDate), 'yyyy-MM-ddTHH:mm:ss.SSSZ') || '';
    
      // Construct an array of reservation objects
      const reservations: RoomReservationChoice[] = [
        {
          hotelNamee:this.hotel?.hotelName,
          numberOfAdults: this.numberOfAdults,
          numberOfChildren: this.numberOfChildren,
          numberOfB: this.numberOfb,
          numbnuit: this.numberOfNights,
          viewOfMakkah: this.viewOfMakkah,
          dateRes: formattedDate,
          roomTypes: [
            {
              id: this.selectedRoomType?.id
            }
          ],
          reservationOptions: [
            {
              id: this.selectedReservationOption?.id
            }
          ]
        }
      ];
    
      console.log(reservations);
    
      // Call the service with the array of reservations
      this.reservationService.addReservation(reservations).subscribe(
        (response) => {
          console.log('Reservations added successfully', response);
        },
        (error) => {
          console.error('Error adding reservations', error);
        }
      );
    }
    
  }










