import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from './items/items.component';
import {OrdersComponent} from './orders/orders.component';
import {TablesComponent} from './tables/tables.component';
import {ActivityComponent} from './activity/activity.component';

const routes: Routes = [
  {path: '', redirectTo: '/tables', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'activity', component: ActivityComponent}
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
