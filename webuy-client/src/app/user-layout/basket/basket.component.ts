import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserTransaction } from 'src/app/models/user.transaction.model';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';
import { LoginComponent } from '../login/login.component';

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  products: any = [];
  total: number = 0;
  shippingCharges: number = 0;
  discount: number = 0;
  constructor(
    private globalService: GlobalService,
    private userService: UsersService,
    private router: Router,
    private commonUtilService: CommonUtilsService
  ) {}

  ngOnInit(): void {
    this.products = this.globalService.cartData.value;
    setTimeout(() => {
      this.calculateTotal();
    });
  }

  checkout() {
    if (this.userService.isLoggedIn) {
      let products: any = [];
      this.products.forEach((element, index) => {
        let product = {
          productId: element.id,
          quantity: parseInt($('.qty')[index].value),
        };
        index += 1;
        products.push(product);
      });
      let userTransaction: UserTransaction = {
        transactionId: null,
        status: 0,
        products: products,
        createdOn: new Date().toString(),
        totalAmount: this.total + this.shippingCharges,
        shippingCharges: this.shippingCharges,
        subTotal: this.total,
        discount: this.discount,
        userId: this.globalService.getUserId,
      };
      console.log(userTransaction);

      this.globalService.checkoutProduct.next(userTransaction);
      this.router.navigateByUrl(
        `/webuy/checkout/${this.total}/${this.shippingCharges}/${
          this.total + this.shippingCharges
        }`
      );
    } else this.commonUtilService.openModal(LoginComponent);
  }

  calculateTotal() {
    this.total = 0;
    this.products.forEach((element, index) => {
      this.total += element.productPrice * parseInt($('.qty')[index].value);
      index += 1;
    });

    this.shippingCharges = this.total > 500 ? 0 : 50;
  }
}
