import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { CommonUtilsService } from 'src/app/utils/common-utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  personalInformationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    public commonUtils: CommonUtilsService,
  ) {
    this.userService.getUSerPersonalDetails().subscribe((res: any) => {
      if (res.data().personalDetails)
        this.personalInformationForm.patchValue(res.data().personalDetails);
    });
  }

  ngOnInit(): void {
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
  }

  saveUserInformation() {
    this.commonUtils.showSpinner();
    this.userService
      .updateUserPersonalDetails(this.personalInformationForm.value)
      .then((res) => {
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(2,'Your details has been updated');
      })
      .catch((err) => {
        console.log(err);
        this.commonUtils.hideSpinner();
        this.commonUtils.showNotification(4,'Some problem occured');
      });
  }
}
