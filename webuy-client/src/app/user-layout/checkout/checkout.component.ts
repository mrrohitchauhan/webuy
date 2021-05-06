import { CommonUtilsService } from 'src/app/utils/common-utils.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  subTotal: number = 0;
  total: number = 0;
  shipping: number = 0;
  constructor(
    private userService: UsersService,
    private globalService: GlobalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public commonUtils: CommonUtilsService
  ) {
    this.subTotal = parseInt(this.route.snapshot.paramMap.get('subtotal'));
    this.shipping = parseInt(this.route.snapshot.paramMap.get('shipping'));
    this.total = parseInt(this.route.snapshot.paramMap.get('total'));
  }
  handler: any = null;
  personalInformationForm: FormGroup;

  ngOnInit() {
    this.personalInformationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      mobile: ['', Validators.required],
    });
    this.loadStripe();
    this.next();
  }

  next(){
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(".next").click(function () {
        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });
  }

  async pay(amount: any) {
    this.next()
    var handler = await (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51IRMzPDE1GA9C9HtDlFaVvyoSJF3F5Qy8LHKsSze1q0M1il57Ee1f02pvDIwpdEAxLFj4YVhQveWHeJKGLfFBgoS00ONEkoW9g',
      locale: 'IN',
      currency: 'INR',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.globalService.checkoutProduct.subscribe((res: any) => {
          res.transactionId = token.id;
          res.personalDetails = this.personalInformationForm.value;
          this.userService
            .addUserTransaction(res)
            .then((res) => {
              $('.final').trigger('click');
            })
            .catch((err) => console.log(err));
            this.globalService.cartData.next([]);
        });
      }
    });

    handler.open({
      name: 'Webuy',
      description: this.globalService.cartData.value.length + " Items",
      amount: this.total * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key:
            'pk_test_51IRMzPDE1GA9C9HtDlFaVvyoSJF3F5Qy8LHKsSze1q0M1il57Ee1f02pvDIwpdEAxLFj4YVhQveWHeJKGLfFBgoS00ONEkoW9g',
          locale: 'IN',
          currency: 'INR',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
