import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTransaction } from 'src/app/models/user.transaction.model';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  order: UserTransaction;
  docId: string;
  refNo: string;
  products: Product[] = [];
  searchtext: string = '';
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private commonUtils: CommonUtilsService
  ) {}

  ngOnInit(): void {
    this.getTransactionSummary();
  }
  getTransactionSummary() {
    this.commonUtils.showSpinner();
    this.docId = this.route.snapshot.paramMap.get('docId');
    this.refNo = this.route.snapshot.paramMap.get('refNo');
    this.userService.getOrderById(this.docId).subscribe((res: any) => {
      this.order = res.payload.data();
      console.log(this.order);
      this.products = [];
      this.order.products.forEach((element) => {
        this.productService
          .getProductById(element.productId)
          .subscribe((res) => {
            let product: any = res.data();
            let pImg = product.productimages.filter((e) => e.imgtype);
            this.products.push({
              productId: element.productId,
              productName: product.name,
              productImg: pImg[0].imgurl,
              productQuantity: element.quantity,
              productPrice: product.price,
            });
            this.commonUtils.hideSpinner();
          });
      });
    });
  }
  orderStatusChanged(status) {
    this.userService
      .updateOrderStatus(status, this.docId)
      .then(() => {
        this.commonUtils.showNotification(2, 'Order has been updated.');
      })
      .catch((e) => {
        this.commonUtils.showNotification(4, e.message);
      });
  }
}
export class Product {
  productId: string;
  productImg: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
}
