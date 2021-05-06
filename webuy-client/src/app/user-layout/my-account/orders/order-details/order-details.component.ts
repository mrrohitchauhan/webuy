import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UserTransaction } from 'src/app/models/user.transaction.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: UserTransaction;
  transactionId: string;
  orderNumber: number;
  products: Product[] = [];
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getTransactionSummary();
  }

  getTransactionSummary() {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.orderNumber = parseInt(this.route.snapshot.paramMap.get('ordernumber'));
    this.userService
      .getUserTransactionDetails(this.transactionId)
      .onSnapshot((res) => {
        res.docs.forEach((e: any) => {
          this.order = e.data();
          console.log(this.order);

          this.order.products.forEach((element) => {
            this.products = [];
            this.productService
              .getProductById(element.productId)
              .subscribe((res) => {
                if (res.data()) {
                  console.log(res);
                  let product: any = res.data();
                  let pImg = product.productimages.filter((e) => e.imgtype);
                  this.products.push({
                    productId: element.productId,
                    productName: product.name,
                    productImg: pImg[0].imgurl,
                    productQuantity: element.quantity,
                    productPrice: product.price,
                  });
                  console.log('this.products', this.products);
                }
              });
          });
        });
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
