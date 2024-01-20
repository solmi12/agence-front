import { Component, OnInit } from '@angular/core';
import { Uberns } from '../model/Uberns.model';
import { UbernsService } from '../services/uberns.service';

@Component({
  selector: 'app-uberuns',
  templateUrl: './uberuns.component.html',
  styleUrls: ['./uberuns.component.css']
})
export class UberunsComponent implements OnInit{
  uberuns: Uberns[] = [];
  constructor(private ubernsService: UbernsService){

  }
  ngOnInit(): void {
    this.ubernsService.getAllUberns().subscribe((data) => {
      this.uberuns = data;
      console.log(data)
    });
  }
}
