import { ReactiveFormsModule } from '@angular/forms';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

@NgModule({
  declarations: [MyAccountComponent, ProfileComponent, OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class MyAccountModule { }
