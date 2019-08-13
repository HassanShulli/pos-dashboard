import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TablesComponent, CreateTableComponent} from './tables/tables.component';
import {PosComponent} from './pos/pos.component';
import {ItemsComponent, CreateItemComponent} from './items/items.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';
import {ChartsModule} from 'ng2-charts';

import {DataService} from './services/data.service';
import {OrderComponent} from './order/order.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {LoginComponent} from './login/login.component';
import {ReportingComponent} from './reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    CreateTableComponent,
    PosComponent,
    ItemsComponent,
    CreateItemComponent,
    OrderComponent,
    MainNavComponent,
    LoginComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    FormsModule,
    MatGridListModule,
    LayoutModule,
    MatDialogModule,
    MatCardModule,
    ChartsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    ChartsModule
  ],
  entryComponents: [
    TablesComponent,
    CreateTableComponent,
    CreateItemComponent
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
