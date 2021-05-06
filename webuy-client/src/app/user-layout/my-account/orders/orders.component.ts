import { Component, NgZone, OnInit } from '@angular/core';
import { UserTransactionList } from 'src/app/models/user.transaction.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderList: UserTransactionList[] = [];
  constructor(private userService: UsersService, private ngZOne: NgZone) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.userService.getUserTransaction().onSnapshot((res: any) => {
      console.log(res);
      this.ngZOne.run(() => {
        this.orderList = [];
        res.docs.forEach((element) => {
          this.orderList.push({
            date: element.data().createdOn,
            total: element.data().totalAmount,
            status: element.data().status,
            transactionsId: element.data().transactionId,
          });
        });
      });
    });
  }
}
