import { Component, ViewChild } from '@angular/core';
import { New } from '../model/New.model';
import { NewService } from '../services/new.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {
  new: any = {};
  @ViewChild('fileInput', { static: false }) fileInput!: any;
  selectedImage: File | null = null;
  newId?:number;
  isAdmin: boolean = true;
  isUser: boolean = false;
  constructor(private newService: NewService,    private authService: AuthService,  private toastr: ToastrService,) {
    this.new = {
      newName:'',
      newDescription:'',
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
  addNew(): void {
    if (this.selectedImage) {
      const formData = new FormData();
  
      // Append the image file to the FormData object
      formData.append('image', this.selectedImage);
  
      formData.append('newDescription', this.new.newDescription);
      formData.append('newName', this.new.newName);
  
      formData.append('new', JSON.stringify(this.new));
  
      this.newService.createNew(formData).subscribe(
        (response) => {
          console.log('Request processed successfully', response);
          this.toastr.success('New added successfully', 'Success');
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
  }
  
}
