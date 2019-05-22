import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  constructor(private nav: MainNavComponent,
              private dataService: DataService) { }

  ngOnInit() {
    console.log(' this.nav.sideNavClass : ',  this.nav.sideNavClass);
    this.nav.sideNavClass = 'sidenavnone';
    this.user = {
      username: '',
      password: ''
    };
  }

}
