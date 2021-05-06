import { Router } from '@angular/router';
import { CommonUtilsService } from './../../utils/common-utils.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private commonUtils: CommonUtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminLoginForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signIn() {
    this.commonUtils.showSpinner();
    this.userService
      .singin(this.adminLoginForm.value)
      .then((res) => {
        if(res.docs.length > 0){
          localStorage.setItem('userid', this.adminLoginForm.value.userid);
          this.commonUtils.showNotification(2, 'Welcome admin.');
          this.commonUtils.hideSpinner();
          this.router.navigateByUrl('admin');
        }else{
          this.commonUtils.showNotification(3, 'Please verify the credentials.');
          this.commonUtils.hideSpinner();

        }
      })
      .catch((err) => {
        this.commonUtils.showNotification(2, err.message);
        this.commonUtils.hideSpinner();
      });
  }
}
