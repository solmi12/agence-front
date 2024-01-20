import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbernsService } from '../services/uberns.service';
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-uberns',
  templateUrl: './add-uberns.component.html',
  styleUrls: ['./add-uberns.component.css']
})
export class AddUbernsComponent implements OnInit{

ubernsForm:FormGroup;
selectedImages: (File | null)[] = [null, null, null]; // Store selected images in an array
  base64Images: (string | null)[] = [null, null, null]; // Store the base64 representations of the images
  isAdmin: boolean = true;

  constructor(private ubernsService: UbernsService,
    private formBuilder:FormBuilder,
    private snackBar: MatSnackBar,
    private authService:AuthService){
      this.ubernsForm= this.formBuilder.group({

        firstName:['', Validators.required],
        secondName:['', Validators.required],
        thirdName:['', Validators.required],
      })

  }

  ngOnInit(): void {
    this.authService.initAuthState().then(() => {

      this.isAdmin = this.authService.hasRole('ADMIN');
      console.log(this.isAdmin)
    });
    
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
      firstName: this.ubernsForm.get('firstName')!.value,
      secondName: this.ubernsForm.get('secondName')!.value,
      thirdName: this.ubernsForm.get('thirdName')!.value,
      firstPicture: this.cleanImageData(this.base64Images[0]) || null,
      secondPicture: this.cleanImageData(this.base64Images[1]) || null,
      thirdPicture: this.cleanImageData(this.base64Images[2]) || null,
    };
  console.log(requestData)
    this.ubernsService.createUberns(requestData).subscribe(
      (response) => {
        console.log('Uberns added successfully:', response);
        this.snackBar.open('Uberns added successfully', 'close', {
          duration: 3000
        });
        this.resetForm();
      },
      (error) => {
        console.error('Error adding ubern:', error);
        this.snackBar.open('An error occurred while adding the ubern.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  

  cleanImageData(imageData: string | null): string | null {
    if (imageData) {
      // Remove the "data:image/jpeg;base64," prefix
      return imageData.split('data:image/jpeg;base64,')[1];
    } else {
      return null;
    }
  }
  

  resetForm(): void{

    this.ubernsForm.reset();
    this.selectedImages = [null, null, null];
    this.base64Images =  [null, null, null]
  }
}
