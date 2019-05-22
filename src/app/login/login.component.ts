import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import { MainNavComponent } from '../main-nav/main-nav.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  isValid: boolean;
  constructor(private nav: MainNavComponent,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.isValid = false;
    console.log(' this.nav.sideNavClass : ', this.nav.sideNavClass);
    this.nav.sideNavClass = 'sidenavnone';
    this.user = {
      email: '',
      password: ''
    };
  }

  login() {
    if (this.user.email === '' || this.user.password === '') {
      alert('Please fill in the email and password fields');
    } else {
      this.isValid = this.emailValidation(this.user.email);
      if (this.isValid) {
        console.log('this.user:  ', this.user);
        console.log('this.isValid : ', this.isValid);
        this.dataService.login(this.user)
        .subscribe(
            result => {
              if (result) {
                console.log('login successful : ', result);

                const decodedToken = helper.decodeToken(result.result);
                window.localStorage.setItem('access_token', result.result);
                // const decodedToken = helper.decodeToken(result.result[0].token);
                this.router.navigate(['/tables']);
              }
            });
      } else {
        alert('Please enter a valid email address, eg. JohnDoe@email.com');
      }
    }
  }

  register() {
    if (this.user.email === '' || this.user.password === '') {
      alert('Please fill in the email and password fields');
    } else {
      this.isValid = this.emailValidation(this.user.email);
      if (this.isValid) {
        this.dataService.register(this.user)
        .subscribe(
            result => {
              if (result) {
                console.log('login successful : ', result);

                // const decodedToken = helper.decodeToken(result.result[0].token);
                this.router.navigate(['/tables']);
              }
            });
      } else {
        alert('Please enter a valid email address, eg. JohnDoe@email.com');
      }
    }
  }

  emailValidation(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
