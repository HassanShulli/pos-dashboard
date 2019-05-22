import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class AuthguardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('access_token')) {
            if (state.url === '/login') {
                this.router.navigate(['/table']);
                return false;
            }
            return true;
        } else {
            if (state.url === '/login') {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }
    }
}
