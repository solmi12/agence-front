import { Component, OnInit } from '@angular/core';
import { New } from '../model/New.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewService } from '../services/new.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.css']
})
export class NewDetailsComponent implements OnInit {
  new: New | null = null;

  constructor(
    private route: ActivatedRoute,
    private newService: NewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const newId = +params['newId'];
      this.newService.getNewById(newId).subscribe((newData: New) => {
        this.new = newData;
        console.log('New details:', this.new); // Debugging line to check the new object
      });
    });
  }
}
