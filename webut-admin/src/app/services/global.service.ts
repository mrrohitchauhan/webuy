import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public cartData = new BehaviorSubject([]);
  public userData = new BehaviorSubject({})
  public checkoutProduct = new BehaviorSubject({})
  public query = new BehaviorSubject([])
  constructor() { }
}
