import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    public commonUtilsService: CommonUtilsService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    this.commonUtilsService.showSpinner();
    console.log(this.registerForm.value);
    this.userService
      .signUp(this.registerForm.value)
      .then((result) => {
        console.log(result.user);
        this.setUserData(result);
      })
      .catch((error) => {
        this.commonUtilsService.hideSpinner();
        console.log(error);
        this.commonUtilsService.showNotification(4, error.message);
      });
  }

  setUserData(result) {
    this.userService
      .setUserData(result.user, this.registerForm.value.name)
      .then((res) => {
        this.signIn(this.registerForm.value);
      });
  }

  signIn(user) {
    this.userService
      .signIn(user)
      .then((result) => {
        console.log(result);
        let user = {};
        this.globalService.userData.next(user);
        this.commonUtilsService.hideSpinner();
        this.commonUtilsService.showNotification(
          2,
          'Please contiune with shopping'
        );
      })
      .catch((error) => {
        this.commonUtilsService.hideSpinner();
        this.commonUtilsService.showNotification(
          2,
          'Thankyou. Please login and contiune shopping.'
        );
        console.log(error.message);
      });
  }
}
