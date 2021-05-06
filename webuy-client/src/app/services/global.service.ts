import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public cartData = new BehaviorSubject([]);
  public userData = new BehaviorSubject({})
  public checkoutProduct = new BehaviorSubject({})
  public menus = new BehaviorSubject({})

  constructor() { }
  get getUserId(): string{
    return JSON.parse(localStorage.getItem('user'))?.uid
  }
  get getUsername(): string{
    return JSON.parse(localStorage.getItem('user'))?.displayName 
  }
  get getUseremail(): string{
    return JSON.parse(localStorage.getItem('user'))?.email
  }
}
