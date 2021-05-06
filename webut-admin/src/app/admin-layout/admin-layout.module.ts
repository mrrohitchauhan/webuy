import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminLayoutRoutingModule } from './admin-layout.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { EditMenuComponent } from './pages/menus/edit-menu/edit-menu.component';
import { MenuListComponent } from './pages/menus/menu-list/menu-list.component';
import { EditOrderComponent } from './pages/orders/edit-order/edit-order.component';
import { ListOrdersComponent } from './pages/orders/list-orders/list-orders.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { FixedPluginModule } from '../shared/fixedplugin/fixedplugin.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QueriesComponent } from './pages/queries/queries.component';



@NgModule({
  declarations: [
    ProductListComponent,
    EditProductComponent,
    ListOrdersComponent,
    EditOrderComponent,
    MenuListComponent,
    EditMenuComponent,
    AdminLayoutComponent,
    QueriesComponent,
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    FixedPluginModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class AdminLayoutModule { }
