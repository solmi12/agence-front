import { Component, OnInit, ViewChild } from '@angular/core';
import { Haj } from '../model/Haj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HajServiceService } from '../services/haj-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-haj',
  templateUrl: './update-haj.component.html',
  styleUrls: ['./update-haj.component.css']
})
export class UpdateHajComponent implements OnInit{

  hajDto: any = {};

  @ViewChild('fileInput', { static: false }) fileInput!: any;
  hajId!: number;
  selectedImage: File | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hajService: HajServiceService,
    private snackBar: MatSnackBar
  ) {
     // Initialize Haj with default values
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hajDto.hajId = Number(params.get('hajId'));
      this.hajService.getHajById(this.hajDto.hajId).subscribe((haj: Haj) => {
        // Assign the values from the haj object to hajDto
        this.hajDto.hajName = haj.hajName;
        this.hajDto.hajDescription = haj.hajDescription;
        this.hajDto.departureAirport = haj.departureAirport;
        this.hajDto.retrnAirport = haj.retrnAirport;
        this.hajDto.going = haj.going;
        this.hajDto.coming = haj.coming;
        this.hajDto.distanceMadina = haj.distanceMadina;
        this.hajDto.distanceMakka = haj.distanceMakka;
        this.hajDto.reservationNumber = haj.reservationNumber;
        this.hajDto.numb = haj.numb;
        this.hajDto.priceVen = haj.priceVen;
        // Assign the rest of the properties
        this.hajDto.airline = haj.airline;
        this.hajDto.price = haj.price;
        this.hajDto.priceAd = haj.priceAd;
        this.hajDto.typeRoom = haj.typeRoom;
        this.hajDto.nbrDays = haj.nbrDays;
        this.hajDto.offre1 = haj.offre1;
        this.hajDto.offre2 = haj.offre2;
        this.hajDto.offre3 = haj.offre3;
        this.hajDto.offre4 = haj.offre4;
        this.hajDto.offre5 = haj.offre5;
        this.hajDto.offre6 = haj.offre6;
        this.hajDto.offre7 = haj.offre7;
        this.hajDto.offre8 = haj.offre8;
        this.hajDto.offre9 = haj.offre9;
        this.hajDto.offre10 = haj.offre10;
        this.hajDto.airfare = haj.airfare;
        this.hajDto.localTransportation = haj.localTransportation;
        this.hajDto.tourGuide = haj.tourGuide;
        this.hajDto.accommodation = haj.accommodation;
        this.hajDto.entranceFees = haj.entranceFees;
        this.hajDto.lunch = haj.lunch;
        this.hajDto.dinner = haj.dinner;
        this.hajDto.showNow = haj.showNow;
        this.hajDto.guideGratuity = haj.guideGratuity;
        this.hajDto.hajDescription2 = haj.hajDescription2;
        this.hajDto.hajCategorie = haj.hajCategorie;
      });
    });
  }
  
  onImageSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedImage = fileList[0];
    }
  }
    onSubmit() {

      console.log("hajId = ",this.hajDto.hajId)
      if (this.hajDto && this.selectedImage) {
        // Get the hajId from the haj object
        const hajId = this.hajDto.hajId;
      const formData = new FormData();

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

    // Call your service method to update the Haj using this.haj
    this.hajService.updateHaj(hajId,formData).subscribe(updatedHaj => {
      // Handle the response or navigate to another page
      this.snackBar.open('Haj updated successfully', 'OK', {
        duration: 3000, // You can adjust the duration as needed
      });
    });
  }}
}
