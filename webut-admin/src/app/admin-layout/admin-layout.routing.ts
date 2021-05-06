import { QueriesComponent } from './pages/queries/queries.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMenuComponent } from './pages/menus/edit-menu/edit-menu.component';
import { MenuListComponent } from './pages/menus/menu-list/menu-list.component';
import { EditOrderComponent } from './pages/orders/edit-order/edit-order.component';
import { ListOrdersComponent } from './pages/orders/list-orders/list-orders.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'edit-product/:productId/:operationType',
        component: EditProductComponent,
      },
      {
        path: 'add-product',
        component: EditProductComponent,
      },
      {
        path: 'orders',
        component: ListOrdersComponent,
      },
      {
        path: 'edit-order/:docId/:refNo',
        component: EditOrderComponent,
      },
      {
        path: 'add-order',
        component: EditOrderComponent,
      },
      {
        path: 'menus',
        component: MenuListComponent,
      },
      {
        path: 'edit-menu/:menuId/:operationType',
        component: EditMenuComponent,
      },
      {
        path: 'add-menu',
        component: EditMenuComponent,
      },
      {
        path: 'queries',
        component: QueriesComponent,
      },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
