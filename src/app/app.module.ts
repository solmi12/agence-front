import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { EmployerMangementComponent } from './employers/employer-mangement.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { SginInComponent } from './sgin-in/sgin-in.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LeaveComponent } from './leave/leave.component';
import { MatDateSelectionModel, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateEmployerComponent } from './update-employer/update-employer.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { TasksComponent } from './tasks/tasks.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { AdminNavbarComponentComponent } from './admin-navbar-component/admin-navbar-component.component';
import { SidbarComponent } from './sidbar/sidbar.component';
import { PreislisteComponent } from './preisliste/preisliste.component';
import { HadschUmraComponent } from './hadsch-umra/hadsch-umra.component';
import { UberunsComponent } from './uberuns/uberuns.component';
import { FAQComponent } from './faq/faq.component';
import { NewsComponent } from './news/news.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { AddKontaktComponent } from './add-kontakt/add-kontakt.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';
import { FaqsClientComponent } from './faqs-client/faqs-client.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HajComponent } from './haj/haj.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UmraComponent } from './umra/umra.component';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { ListHajjUserComponent } from './list-hajj-user/list-hajj-user.component';
import { ListHajjAdminComponent } from './list-hajj-admin/list-hajj-admin.component';
import { HajDetailsComponent } from './haj-details/haj-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { CustomHttpInterceptor } from './model/http.interceptor';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddNewComponent } from './add-new/add-new.component';
import { NewDetailsComponent } from './new-details/new-details.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListHotelsUserComponent } from './services/list-hotels-user/list-hotels-user.component';
import { UpdateHajComponent } from './update-haj/update-haj.component';
import { ListhajjComponent } from './listhajj/listhajj.component';
import { ListumraComponent } from './listumra/listumra.component';
import { ListotherComponent } from './listother/listother.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { AddUbernsComponent } from './add-uberns/add-uberns.component';
import { ListUbernsAdminComponent } from './list-uberns-admin/list-uberns-admin.component';
import { Router } from '@angular/router';


export function initializeAuthService(authService: AuthService) {
  return () => authService.initAuthState();
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SginInComponent,
    EmployerMangementComponent,
    RegisterEmployeeComponent,
    LeaveComponent,
    UpdateEmployerComponent,
    ProfileEmployeeComponent,
    ModalComponent,
    TasksComponent,
    LeaveManagementComponent,
    AdminProfileComponent,
    HomeComponent,
    AdminNavbarComponentComponent,
    SidbarComponent,
    PreislisteComponent,
    HadschUmraComponent,
    UberunsComponent,
    FAQComponent,
    NewsComponent,
    KontaktComponent,
    AddKontaktComponent,
    DashbordAdminComponent,
    FaqsComponent,
    AddFaqsComponent,
    FaqsClientComponent,
    ConfirmationDialogComponent,
    HajComponent,
    UmraComponent,
    ListHajjUserComponent,
    ListHajjAdminComponent,
    HajDetailsComponent,
    ShopDetailsComponent,
    CookieConsentComponent,
    CartComponent,
    CheckoutComponent,
    AddNewComponent,
    NewDetailsComponent,
    ListInvoiceComponent,
    AddHotelsComponent,
    ListHotelsComponent,
    ListHotelsUserComponent,
    UpdateHajComponent,
    ListhajjComponent,
    ListumraComponent,
    ListotherComponent,
    HotelDetailsComponent,
    InvoiceDetailComponent,
    AddUbernsComponent,
    ListUbernsAdminComponent ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    NgbModule,
    FullCalendarModule, 
    HttpClientModule ,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
   
  
                 
   
    
    
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // Default strategy

   
    
    DatePipe,   
   
    JwtHelperService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor, // You can create an interceptor to set withCredentials
      multi: true,
    },
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthService,
      deps: [AuthService],
      multi: true
    }
    
    // 
    // required animations providers
    // Toastr providers
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideToastr(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

