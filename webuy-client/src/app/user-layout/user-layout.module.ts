import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLayoutRoutingModule } from './user-layout.routing';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    UserLayoutComponent,
    DashboardComponent,
    ProductDetailsComponent,
    ProductsComponent,
    BasketComponent,
    NotFoundComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserLayoutRoutingModule,
    NgxSpinnerModule,
    TimeagoModule.forRoot()
  ],
})
export class UserLayoutModule {}
