import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { OrderList } from '../../../../models/order.model';
import { UsersService } from '../../../../services/users.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit {
  orderList: OrderList[] = [];
  searchtext: string = '';

  constructor(
    private userService: UsersService,
    private ngZone: NgZone,
    private commonUtils: CommonUtilsService
  ) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.commonUtils.showSpinner();
    this.userService.getUsersOrderList().subscribe(
      (res) => {
        this.orderList = [];
        res.forEach((e: any) => {
          this.ngZone.run(() => {
            let order: any = e.payload.doc.data();
            let id = e.payload.doc.id;
            this.orderList.push({
              userId: order.userId,
              userName: `${order.personalDetails.firstName} ${order.personalDetails.lastName}`,
              totalAmount: order.totalAmount,
              status: order.status,
              transactionId: order.transactionId,
              docId: id,
            });
          });
        });
        this.commonUtils.hideSpinner();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
