import { CommonUtilsService } from '../../../../utils/common-utils.service';
import { ProductsService } from '../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchtext: string = '';

  constructor(
    private productService: ProductsService,
    private commonUtils: CommonUtilsService
  ) {}
  productList: Products[] = [];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.commonUtils.showSpinner();
    this.productService.getProducts().subscribe(
      (res) => {
        res.docs.forEach((e: any, i) => {
          this.productList.push(e.data());
          this.productList[i].productId = e.id;
          i++;
        });
        this.commonUtils.hideSpinner();
      },
      (err) => {
        console.log(err);
        this.commonUtils.hideSpinner();
      }
    );
  }

  removeProduct(productId) {
    this.commonUtils.showSpinner();
    this.productService
      .removeProduct(productId)
      .then((res) => {
        this.commonUtils.showNotification(2, 'Product has been removed.');
        this.commonUtils.hideSpinner();
      })
      .catch((err) => {
        this.commonUtils.showNotification(2, err.message);
        this.commonUtils.hideSpinner();
      });
  }
}
