import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from './items/items.component';
import {PosComponent} from './pos/pos.component';
import {TablesComponent} from './tables/tables.component';
import {OrderComponent} from './order/order.component';
import {LoginComponent} from './login/login.component';
import {ReportingComponent} from './reporting/reporting.component';

import {AuthguardService} from './services/auth.service';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'pos', component: PosComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'reporting', component: ReportingComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: TablesComponent}
  // , canActivate: [AuthguardService]
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
