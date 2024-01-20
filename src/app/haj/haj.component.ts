  import { Component, ViewChild } from '@angular/core';
  import { HajServiceService } from '../services/haj-service.service';
  import { NgForm } from '@angular/forms';
  import { AuthService } from '../services/auth.service';
  import { Haj, HajCategorie } from '../model/Haj.model';
  import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


  @Component({
    selector: 'app-haj',
    templateUrl: './haj.component.html',
    styleUrls: ['./haj.component.css']
  })
  export class HajComponent {
    hajDto: any = {};
    @ViewChild('fileInput', { static: false }) fileInput!: any;
    isAdmin: boolean = true;
    isUser: boolean = false;
    selectedImage: File | null = null;
    hajId!: number;
    hajCategories: string[] = Object.values(HajCategorie); // E
    
    constructor(
      private hajService: HajServiceService,
      private authService: AuthService,
      private toastr: ToastrService,
      private datePipe: DatePipe,
      private router: Router,
    ) {
      this.hajDto = {
        hajName: '',
        hajDescription: '',
        departureAirport: '',
        retrnAirport: '',
        going: '',
        distanceMakka:'',
        distanceMadina:'',
        reservationNumber: 0,
        numb:0, 
        priceAd: 0, // Set an appropriate default value for reservationNumber
        coming:'',
        airline: '',
        price: null, // Set an appropriate default value for price
        airfare: false, // Set an appropriate default value for airfare
        localTransportation: false, // Set an appropriate default value for local_Transportation
        tourGuide: false, // Set an appropriate default value for tour_Guide
        accommodation: false, // Set an appropriate default value for accommodation
        entranceFees: false, // Set an appropriate default value for entrance_Fees
        lunch: false, // Set an appropriate default value for lunch
        dinner: false,
        showNow:false, // Set an appropriate default value for dinner
        guideGratuity: false, // Set an appropriate default value for guide_Gratuity
        hajDescription2: '',
        hajCategorie: HajCategorie // Set an appropriate default value for hajCategorie
      };
    }

    ngOnInit(): void {
      this.authService.initAuthState().then(() => {
        this.isAdmin = this.authService.hasRole('ADMIN');
      });
    } 

    onImageSelected(event: any): void {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.selectedImage = fileList[0];
      }
    }

    onSubmit(): void {
      if (this.selectedImage) {
        const formData = new FormData();

        // Append the image file to the FormData object
        formData.append('image', this.selectedImage);

        // Append all the properties from the Haj object
        formData.append('hajName', this.hajDto.hajName);
        formData.append('hajDescription', this.hajDto.hajDescription);
        formData.append('departureAirport', this.hajDto.departureAirport);
        formData.append('retrnAirport', this.hajDto.retrnAirport);
        formData.append('going', this.hajDto.going);
        formData.append('coming', this.hajDto.coming);
        formData.append('distanceMadina', this.hajDto.distanceMadina);
        formData.append('distanceMakka', this.hajDto.distanceMakka);

        formData.append('reservationNumber', this.hajDto.reservationNumber.toString()); // Convert to string

        formData.append('numb', this.hajDto.numb.toString());
        formData.append('priceVen', this.hajDto.priceVen.toString());
        // Parse the 'coming' date string into a Date object
     
     
        // Append the rest of the properties
        formData.append('airline', this.hajDto.airline);
        formData.append('airline', this.hajDto.airline);
        formData.append('price', this.hajDto.price);
        formData.append('priceAd', this.hajDto.priceAd.toString());
        formData.append('typeRoom', this.hajDto.typeRoom);
        formData.append('nbrDays', this.hajDto.nbrDays);
        formData.append('offre1', this.hajDto.ofrre1);
        formData.append('offre2', this.hajDto.offre2);
        formData.append('offre3', this.hajDto.offre3);
        formData.append('offre4', this.hajDto.offre4);
        formData.append('offre5', this.hajDto.offre5);
        formData.append('offre6', this.hajDto.offre6);
        formData.append('offre7', this.hajDto.offre7);
        formData.append('offre8', this.hajDto.offre8);
        formData.append('offre9', this.hajDto.offre9);
        formData.append('offre10', this.hajDto.offre10);
        formData.append('airfare', this.hajDto.airfare.toString());
        formData.append('localTransportation', this.hajDto.localTransportation.toString());
        formData.append('tourGuide', this.hajDto.tourGuide.toString());
        formData.append('accommodation', this.hajDto.accommodation.toString());
        formData.append('entranceFees', this.hajDto.entranceFees.toString());
        formData.append('lunch', this.hajDto.lunch.toString());
        formData.append('dinner', this.hajDto.dinner.toString());
        formData.append('showNow', this.hajDto.showNow.toString());

        formData.append('guideGratuity', this.hajDto.guideGratuity.toString());
        formData.append('hajDescription2', this.hajDto.hajDescription2);
        formData.append('hajCategorie', this.hajDto.hajCategorie);


        formData.append('hajDto', JSON.stringify(this.hajDto)); 

        // Now you have appended all the properties to the FormData object

        this.hajService.addHaj(formData).subscribe(
          (response) => {
            console.log('Request processed successfully', response);
            this.toastr.success('Haj added successfully', 'Success');
            // Handle success here, maybe navigate to a different page or clear the form
            // this.router.navigate(['/some-other-page']);
          },
          (error) => {
            console.error('Error processing the request', error);
            this.toastr.error('An error occurred while adding Haj', 'Error');
            // Handle error here
          }
        );
      } else {
        console.error('Please select an image and fill in the form data.');
        this.toastr.error('Please select an image and fill in the form data.', 'Error');
        // Handle validation error here
      }
      console.log(FormData)
    }


 
    
  }
