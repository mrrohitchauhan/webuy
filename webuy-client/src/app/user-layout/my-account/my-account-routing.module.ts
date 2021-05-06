import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {}
