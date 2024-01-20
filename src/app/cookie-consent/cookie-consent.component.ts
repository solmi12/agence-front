import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  consentGiven: boolean = false;
  sessionId: string | undefined;

  constructor(private cookieService: CookieService, private sessionService: CartService) {}

  ngOnInit(): void {
    // Check if the user has previously given consent
    const userConsent = this.cookieService.get('cookie_consent');
    if (userConsent === 'accepted') {
      this.consentGiven = true;
  }
  }
  acceptConsent() {
    // Set a cookie to remember that the user accepted cookies
    this.cookieService.set('cookie_consent', 'accepted', 365); // Expires in 365 days
    this.consentGiven = true;
  
    // No need to get the session ID here, as it's managed by JSESSIONID
    // this.sessionId = this.sessionService.getSessionId();
  }

  rejectConsent() {
    // Handle user rejection if needed
    this.consentGiven = true; // For the example, we consider rejection as if consent is given
  }
}
