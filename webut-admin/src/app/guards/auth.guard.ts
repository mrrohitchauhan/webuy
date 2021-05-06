import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router){}
  canLoad(): boolean {
    if(!!localStorage.getItem('userid')){
      return true
    }else{
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
