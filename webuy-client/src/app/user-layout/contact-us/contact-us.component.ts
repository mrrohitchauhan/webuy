import { ProductsService } from './../../services/products.service';
import { GlobalService } from './../../services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';

declare var $: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private productService: ProductsService,
    private commonUtils: CommonUtilsService
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: [this.globalService.getUsername, Validators.required],
      email: [this.globalService.getUseremail, Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      solved: [false, Validators.required]
    });

    setTimeout(() => {
      $('.js-tilt').tilt({
        scale: 1.1,
      });
    }, 10);
  }

  sendMail() {
    this.commonUtils.showSpinner();
    this.productService.addUserQueries(this.contactForm.value).then(
      (res) => {
        this.commonUtils.hideSpinner();
        this.contactForm.controls['subject'].setValue('');
        this.contactForm.controls['message'].setValue('');
        this.commonUtils.showNotification(2, "Query has been sent.")
      },
      (err) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4, err.message)
        console.log(err);
      }
    );
  }
}
