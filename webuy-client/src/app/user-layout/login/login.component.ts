import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private commonUtilsService: CommonUtilsService,
    private userService: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  closeLoginModal() {
    this.commonUtilsService.closeModal();
  }

  signIn() {
    this.commonUtilsService.showSpinner();
    this.userService
      .signIn(this.loginForm.value)
      .then((result) => {
        console.log(result);
        this.commonUtilsService.hideSpinner();
        this.commonUtilsService.showNotification(
          2,
          'Please contiune with shopping'
        );
        this.closeLoginModal();
      })
      .catch((error) => {
        this.commonUtilsService.hideSpinner();
        this.commonUtilsService.showNotification(4, error.message);
        console.log(error.message);
      });
  }
}
