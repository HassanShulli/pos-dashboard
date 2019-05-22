import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  constructor(private nav: MainNavComponent) { }

  ngOnInit() {
    this.nav.sideNavClass = 'sidenavnone';
    this.user = {
      username: '',
      password: ''
    };
  }

}
