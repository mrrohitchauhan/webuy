import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }
  signOut(){
    this.userService.signOut();
  }
}
