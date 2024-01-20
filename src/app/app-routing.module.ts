import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerMangementComponent } from './employers/employer-mangement.component';
import { SginInComponent } from './sgin-in/sgin-in.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { LeaveComponent } from './leave/leave.component';
import { UpdateEmployerComponent } from './update-employer/update-employer.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { TasksComponent } from './tasks/tasks.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { RoleGuard } from './services/roleGuard/role-guard.service';
import { HomeComponent } from './home/home.component';
import { HadschUmraComponent } from './hadsch-umra/hadsch-umra.component';
import { NewsComponent } from './news/news.component';
import { UberunsComponent } from './uberuns/uberuns.component';
import { PreislisteComponent } from './preisliste/preisliste.component';
import { FAQComponent } from './faq/faq.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { AddKontaktComponent } from './add-kontakt/add-kontakt.component';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HajComponent } from './haj/haj.component';
import { UmraComponent } from './umra/umra.component';
import { ListHajjUserComponent } from './list-hajj-user/list-hajj-user.component';
import { HajDetailsComponent } from './haj-details/haj-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddNewComponent } from './add-new/add-new.component';
import { NewDetailsComponent } from './new-details/new-details.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { ListHajjAdminComponent } from './list-hajj-admin/list-hajj-admin.component';
import { UpdateHajComponent } from './update-haj/update-haj.component';
import { ListhajjComponent } from './listhajj/listhajj.component';
import { ListumraComponent } from './listumra/listumra.component';
import { ListotherComponent } from './listother/listother.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { AddUbernsComponent } from './add-uberns/add-uberns.component';
import { ListUbernsAdminComponent } from './list-uberns-admin/list-uberns-admin.component';


const routes: Routes = [

  {path:"login",component:SginInComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"adminDashbord", component:DashbordAdminComponent},
  {path:"addKontakt", component:AddKontaktComponent},
  {path:"HadschUmra", component:ListHajjUserComponent},
  { path: "hajDetails/:hajId", component: HajDetailsComponent },
  {path:"shopdetails", component:ShopDetailsComponent},
  {path:"listHajj", component:ListhajjComponent},
  {path:"listUmra", component:ListumraComponent},
  {path:"listOther", component:ListotherComponent},
  {path:"News", component:NewsComponent},
  {path:"new-haj", component:HajComponent},
  {path:"Uberuns", component:UberunsComponent},
  {path:"Hotels", component:PreislisteComponent},
  {path:"listUbern", component:ListUbernsAdminComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"addUbern", component:AddUbernsComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"Hotels/:hotelId", component:HotelDetailsComponent},
  {path:"update-haj/:hajId", component:UpdateHajComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"Cart", component:CartComponent},
  {path:"Checkout", component:CheckoutComponent},
  {path:"newDetails/:newId", component:NewDetailsComponent},
  {path:"list-haj-admin", component:ListHajjAdminComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"FAQ", component:FAQComponent},
  {path:"Umra", component:UmraComponent},
  {path:"LIST-FAQ", component:FaqsComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"add-hotel", component:AddHotelsComponent ,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},//,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}
  {path:"add-new", component:AddNewComponent},
  {path:"addFaq", component:AddFaqsComponent ,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}} ,
  {path:"invoiceDetail/:id", component:InvoiceDetailComponent } ,
  {path:"Kontakt", component:KontaktComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"List-invoice", component:ListInvoiceComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN'}},
  {path:"home",component:HomeComponent},
  {path:"list-hotel",component:ListHotelsComponent},
  
  {path:"employees",component:EmployerMangementComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' }},

  {path:"registerEmployee",component:RegisterEmployeeComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' }},
  {path:"leave",component:LeaveComponent,canActivate: [RoleGuard], data: { requiredRole: 'EMPLOYER' }},
  {path:"updateEmployee/:id",component:UpdateEmployerComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' }},

  {path:"tasks",component:TasksComponent,canActivate: [RoleGuard], data: { requiredRole: 'EMPLOYER' }},
  {path:"leaveMangement",component:LeaveManagementComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' }},
  {path:"profile",component:ProfileEmployeeComponent,canActivate: [RoleGuard], data: { requiredRole: 'EMPLOYER' }},
  {path:"adminProfile",component:AdminProfileComponent,canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' }},

 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
