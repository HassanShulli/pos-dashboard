import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      console.log('localStorage.getItem(access_token) in auth gaurd: ', localStorage.getItem('access_token'));
      // console.log('state.url : ', state.url);
      console.log('this.router.url : ', this.router.url);
        // if (this.router.url !== '/login') {
        //     this.router.navigate(['/tables']);
        //     return true;
        // }
        return true;
    }
    // else {
    //     if (state.url === '/login') {
    //         return true;
    //     }
    //     this.router.navigate(['/login']);
    //     return false;
    // }
}

}

// export class AuthGuard {
//   constructor() {}

//   getUserDetails() {

//   }
// }
