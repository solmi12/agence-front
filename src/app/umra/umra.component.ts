import { Component } from '@angular/core';
import { Umra } from '../model/Umra.mode';
import { UmraService } from '../services/umra.service';

@Component({
  selector: 'app-umra',
  templateUrl: './umra.component.html',
  styleUrls: ['./umra.component.css']
})
export class UmraComponent {

  umra : Umra;
  umraId!:number;
   umraAdded: boolean = false;
  constructor(private umraService: UmraService ) {
    this.umra = new Umra(this.umraId,'');
  }

  onSubmit() {


    this.umraService.addUmra(this.umra).subscribe(
      response => {
        console.log('FAQ added successfully:', response);
        // Clear the form after successful submission
     
        this.umra = new Umra(this.umraId,'');

           this.umraAdded = true;
      },
      error => {
        console.error('Error adding Umra:', error);
      }
    );
 
  }
}
