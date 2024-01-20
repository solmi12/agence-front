import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.css']
})

export class AddHotelsComponent implements OnInit {
  hotelForm: FormGroup;
  selectedImages: (File | null)[] = [null, null, null, null, null,null,null,null,null,null]; // Store selected images in an array
  base64Images: (string | null)[] = [null, null, null, null, null,null,null,null,null,null]; // Store the base64 representations of the images
  isAdmin: boolean = true;

  constructor(
    private hotelService: HotelsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.hotelForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      numberOfStars: [0, Validators.required],
      location:['',Validators.required],
      priceAb:['',Validators.required],
      adresse: ['', Validators.required],
      roomTypes: this.formBuilder.array([]),
      reservationOptions: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.authService.initAuthState().then(() => {
      this.isAdmin = this.authService.hasRole('ADMIN');
    });
  }

  get roomTypesArray() {
    return this.hotelForm.get('roomTypes') as FormArray;
  }

  get reservationOptionsArray() {
    return this.hotelForm.get('reservationOptions') as FormArray;
  }

  onImageChange(event: Event, imageField: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];

    if (file) {
      // Find the index of the image field based on its name
      const imageIndex = parseInt(imageField.charAt(imageField.length - 1)) - 1;
      this.selectedImages[imageIndex] = file;

      // Convert the selected image to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64Images[imageIndex] = event.target!.result as string;
      };
      reader.readAsDataURL(this.selectedImages[imageIndex]!);
    }
  }

  onSubmit(): void {
    const requestData: any = {
      hotelName: this.hotelForm.get('hotelName')!.value,
      numberOfStars: this.hotelForm.get('numberOfStars')!.value,
      adresse: this.hotelForm.get('adresse')!.value,
      location:this.hotelForm.get('location')!.value,
      priceAb:this.hotelForm.get('priceAb')!.value,
    };
  
    // Add images to the request data without the prefix
    for (let i = 0; i < this.base64Images.length; i++) {
      if (this.base64Images[i]) {
        requestData[`image${i + 1}`] = this.base64Images[i]!.split('data:image/jpeg;base64,')[1];
      } else {
        requestData[`image${i + 1}`] = null;
      }
    }
  
    requestData.roomTypes = this.hotelForm.get('roomTypes')!.value;
    requestData.reservationOptions = this.hotelForm.get('reservationOptions')!.value;
  
    this.hotelService.createHotel(requestData).subscribe(
      (response) => {
        console.log('Hotel added successfully:', response);
        this.snackBar.open('Hotel added successfully!', 'Close', {
          duration: 3000
        });
        this.resetForm();
      },
      (error) => {
        console.error('Error adding hotel:', error);
        this.snackBar.open('An error occurred while adding the hotel.', 'Close', {
          duration: 3000
        });
      });
  }
  
  addRoomType(): void {
    this.roomTypesArray.push(this.formBuilder.group({
      typeRoom: '',
      priceAdulte: null,
      priceChild: null,
      priceChildB: null,
      viewOfMakkah: null,
      maxOccupancy: null
    }));
  }

  addReservationOption(): void {
    this.reservationOptionsArray.push(this.formBuilder.group({
      optionName: '',
      price: null
    }));
  }

  resetForm(): void {
    this.hotelForm.reset();
    this.roomTypesArray.clear();
    this.reservationOptionsArray.clear();
    this.selectedImages = [null, null, null, null, null,null,null,null,null,null];
    this.base64Images = [null, null, null, null, null,null,null,null,null,null];
  }
}
