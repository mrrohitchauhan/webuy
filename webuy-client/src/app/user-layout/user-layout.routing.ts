import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule } from '@angular/core';
import { UserLayoutComponent } from './user-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './my-account/orders/order-details/order-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products/:cat/:subcat',
        component: ProductsComponent,
      },
      {
        path: 'product-detils/:productid',
        component: ProductDetailsComponent,
      },
      {
        path: 'basket',
        component: BasketComponent,
      },
      {
        path: 'checkout/:subtotal/:shipping/:total',
        component: CheckoutComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./my-account/my-account.module').then(
            (module) => module.MyAccountModule
          ),
      },
      {
        path: 'order-details/:transactionId/:ordernumber',
        component: OrderDetailsComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      { path: '404', component: NotFoundComponent },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '404' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLayoutRoutingModule {}
