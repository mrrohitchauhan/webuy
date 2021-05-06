import { Component, NgZone, OnInit } from '@angular/core';
import { Menus } from 'src/app/models/menu.model';
import { IUser } from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global.service';
import { MenusService } from 'src/app/services/menus.service';
import { UsersService } from 'src/app/services/users.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  title = 'ecommerce';
  menus: Menus[] = [];
  cartItemCounts: number = 0;
  user: IUser;
  isLoggedIn: boolean = false;
  constructor(
    private menuService: MenusService,
    private globalService: GlobalService,
    private commonUtilService: CommonUtilsService,
    private userService: UsersService,
    private ngZone: NgZone
  ) {
    this.commonUtilService.showSpinner();
    this.getMenu();
    this.isLoggedIn = this.userService.isLoggedIn;
    this.getUser();
  }


  getMenu() {
    this.menuService.getmenu().subscribe((res: any) => {
      this.ngZone.run(() => {
        this.menus = [];
        res.forEach(element => {
          this.menus.push(element.payload.doc.data())
         });
      })
      this.globalService.menus.next(this.menus)
      this.commonUtilService.hideSpinner();
    });
    this.globalService.cartData.subscribe((cartCount: any) => {
      this.cartItemCounts = cartCount.length;
    });
  }

  getUser() {
    this.globalService.userData.subscribe((res: any) => {
      this.user = res;
      console.log(res);
      this.isLoggedIn = !!(res && Object.keys(res).length);
    });
  }

  openLoginModal() {
    this.commonUtilService.openModal(LoginComponent);
  }
}

