import { Menus } from './../../models/menu.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/product.model';
import { GlobalService } from 'src/app/services/global.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';

declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Products;
  productId: string;
  menus: Menus[] = [];
  reviews: Reviews[] = [];
  isCommented: boolean = false;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private commonUtilsService: CommonUtilsService,
    private globalService: GlobalService
  ) {
    this.globalService.menus.subscribe((res: any) => {
      this.menus = res;
      console.log('Menus', res);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.commonUtilsService.showSpinner();
      this.productId = params['productid'];
      this.productService
        .getProductById(params['productid'])
        .subscribe((res: any) => {
          this.getReviews();
          this.product = res.data();
          setTimeout(() => {
            $('.shop-detail-carousel').owlCarousel(
              {
                items: 1,
                thumbs: true,
                nav: false,
                dots: false,
                loop: true,
                autoplay: true,
                thumbsPrerendered: true,
              },
              100
            );
            this.commonUtilsService.hideSpinner();
          });
          console.log(this.product);
        });
    });
  }

  addToCart() {
    let product = {
      id: this.productId,
      productName: this.product.name,
      productPrice: this.product.price,
      productImgUrl: this.product.productimages.find((e) => {
        if (e.imgtype) return e;
      }),
      quantity: 1,
    };
    let add = true;
    if (this.globalService.cartData.value.length > 0) {
      this.globalService.cartData.value.find((e) => {
        if (e.id == product.id) {
          e.quantity += 1;
          add = false;
        }
      });
    }
    if (add)
      this.globalService.cartData.next([
        ...this.globalService.cartData.value,
        product,
      ]);
    add = true;
    console.log(this.globalService.cartData.value);
  }
  getReviews() {
    this.commonUtilsService.showSpinner();
    this.productService
      .getReviewsForProduct(this.productId)
      .subscribe((res: any) => {
        this.reviews = [];
        res.forEach((review) => {
          if (review.payload.doc.data().userName == this.globalService.getUsername)
            this.isCommented = true;
          this.reviews.push(review.payload.doc.data());
        });
        this.commonUtilsService.hideSpinner();
      });
  }
  postReview(comment) {
    this.commonUtilsService.showSpinner();
    let review: Reviews = {
      userName: this.globalService.getUsername,
      comment: comment,
      commentedOn: new Date().toString(),
    };
    this.productService
      .addReviewsToProduct(this.productId, review)
      .then((res) => {
        this.commonUtilsService.hideSpinner();
        this.commonUtilsService.showNotification(2, 'Review submitted.');
      })
      .catch((e) => {
        this.commonUtilsService.showNotification(4, e.message);
        this.commonUtilsService.hideSpinner();
      });
  }
}

export class Reviews {
  userName: string;
  comment: string;
  commentedOn: string;
}
