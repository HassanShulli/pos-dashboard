import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  coffeeCount: any;
  cakeCount: any;
  mixedCount: any;
  tableCount: any;
  coffeeOrdersCount: any;
  cakeOrdersCount: any;
  mixedOrdersCount: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.initCoffeeCount();
    this.initCakeCount();
    this.initTablesCount();
    this.initCoffeeOrdersCount();
    this.initCakeOrdersCount();
    this.initMixedOrdersCount();
    // this.initMixedCount();
  }

  initCoffeeCount() {
    this.dataService.getCount({type: 'coffee'})
      .subscribe(result => {
        if (result.success === true) {
          this.coffeeCount = result.result;
          console.log('this.coffeeCount : ', this.coffeeCount);
        }
      });
  }

  initCakeCount() {
    this.dataService.getCount({type: 'cake'})
      .subscribe(result => {
        if (result.success === true) {
          this.cakeCount = result.result;
          console.log('this.cakeCount : ', this.cakeCount);
        }
      });
  }

  initTablesCount() {
    this.dataService.getCount({type: 'table'})
      .subscribe(result => {
        if (result.success === true) {
          this.tableCount = result.result;
          console.log('this.tableCount : ', this.tableCount);
        }
      });
  }

  initCakeOrdersCount() {
    this.dataService.orderCount('cake')
      .subscribe(res => {
        if (res.success === true) {
          this.cakeOrdersCount = res.result;
          console.log('this.cakeOrdersCount : ', this.cakeOrdersCount);
        }
      });
  }

  initCoffeeOrdersCount() {
    this.dataService.orderCount('coffee')
      .subscribe(res => {
        if (res.success === true) {
          this.coffeeOrdersCount = res.result;
          console.log('this.coffeeOrdersCount : ', this.coffeeOrdersCount);
        }
      });
  }

  initMixedOrdersCount() {
    this.dataService.orderCount('mixed')
      .subscribe(res => {
        if (res.success === true) {
          this.mixedOrdersCount = res.result;
          console.log('mixedOrdersCount : ', this.mixedOrdersCount);
        }
      });
  }


  //   this.dataService.orderCount({orderType: 'table'})
  //     .subscribe(result => {
  //       if (result.success === true) {
  //         this.ordersCount = result.result;
  //         console.log('this.ordersCount : ', this.ordersCount);
  //       }
  //     });
  // }


}
