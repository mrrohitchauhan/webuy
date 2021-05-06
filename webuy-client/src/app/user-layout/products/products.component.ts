import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/product.model';
import { GlobalService } from 'src/app/services/global.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  mainMenu = "";
  subMenu = "";
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mainMenu = params['cat'];
      this.subMenu = params['subcat'];
      console.log(params['cat'], params['subcat']);
      this.productService
        .getProducts(params['cat'], params['subcat'])
        .subscribe((res: any) => {
          this.products = res.map((e) => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Products;
          });
          console.log(this.products);

          this.products = this.products.filter(
            (e: any) =>
              e.menu == params['cat'] &&
              e.subcategory == params['subcat'] &&
              e.isActive
          );
          console.log(this.products);
        });
    });
  }
  addToCart(product) {
    let productData = {
      id: product.id,
      productName: product.name,
      productPrice: product.price,
      productImgUrl: product.productimages.find((e) => {
        if (e.imgtype) return e;
      }),
      quantity: 1,
    };
    let add = true;
    if (this.globalService.cartData.value.length > 0) {
      this.globalService.cartData.value.find((e) => {
        if (e.id == productData.id) {
          e.quantity += 1;
          add = false;
        }
      });
    }
    if (add)
      this.globalService.cartData.next([
        ...this.globalService.cartData.value,
        productData,
      ]);
      add = true;

    console.log(this.globalService.cartData.value);
  }
  onSortByChange(e) {
    console.log(e);
    this.products.sort(this.dynamicSort(e.target.value));
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}
