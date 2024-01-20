import { Component, OnInit } from '@angular/core';
import { New } from '../model/New.model'; // Make sure to import the New model
import { NewService } from '../services/new.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: New[] = []; // Define a variable to store the list of news

  constructor(private newService: NewService, private router: Router) {}

  ngOnInit(): void {
    this.loadNews(); // Load news when the component initializes
  }

  loadNews(): void {
    this.newService.getAllNews().subscribe(
      (news: New[]) => {
        this.newsList = news; // Assign the retrieved news list to the variable
        console.log(news);
      },
      (error) => {
        console.error('Error loading news:', error);
      }
    );
  }

  navigateToDetails(newId: number | null): void {
    if (newId !== null && newId !== 0) {
      // Navigate to the hajDetails component with the selected hajId
      this.router.navigate(['/newDetails', newId]);
      console.log(newId);
    } else {
      // Handle the case where hajId is null or 0 (optional)
    }
    console.log(newId)
  }
  
}
