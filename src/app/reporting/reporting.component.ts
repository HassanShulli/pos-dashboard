import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {MultiDataSet, Label} from 'ng2-charts';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  coffeeCount: any;
  cakeCount: any;
  // mixedCount: any;
  tableCount: any;
  coffeeOrdersCount = 0;
  cakeOrdersCount = 0;
  mixedOrdersCount = 0;
  // Doughnut Chart
  public options: any = {
    legend: {position: 'left'}
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#55D8FE', '#FF8373', '#FF73CC', '#887F85']
    }
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public ordersChartLabels: Label[] = ['Coffee', 'Cake', 'Mixed'];
  public ordersChartData: MultiDataSet = [
    [0, 0, 0]
  ];
  // Tables Bar Chart
  public tableBarChartLegend = true;
  public tableBarChartPlugins = [];
  public tableBarChartLabels: Label[] = [];
  public tableBarChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0]}
  ];
  // Coffee Bar Chart
  public coffeeBarChartLegend = true;
  public coffeeBarChartPlugins = [];
  public coffeeBarChartLabels: Label[] = [];
  public coffeeBarChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0]}
  ];


  // Cake Bar Chart
  public cakeBarChartLegend = true;
  public cakeBarChartPlugins = [];
  public cakeBarChartLabels: Label[] = [];
  public cakeBarChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0]}
  ];

  // General Bar Chart Values
  public barChartType: ChartType = 'bar';
  public tableBarChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public colors = [
    {
      backgroundColor: [
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB',
        '#A3A1FB'
      ]
    }];

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
        let temp = [];
        if (result.success === true) {
          this.coffeeBarChartData[0].data = [];
          this.coffeeCount = result.result;
          console.log('this.coffeeCount : ', this.coffeeCount);
          for (let i = 0; i < result.result.length; i++) {
            this.coffeeBarChartLabels.push(result.result[i].item_id.name);
            temp.push(result.result[i].count);
          }
          this.coffeeBarChartData[0].data = temp;
          // result.result.forEach(coffee => {
          //   this.coffeeBarChartData[0].data = temp;
          // });
        }
      });
  }

  initCakeCount() {
    this.dataService.getCount({type: 'cake'})
      .subscribe(result => {
        if (result.success === true) {
          let tempCake = [];
          this.cakeCount = result.result;
          console.log('this.cakeCount : ', this.cakeCount);
          this.cakeBarChartData[0].data = [];
          for (let i = 0; i < result.result.length; i++) {
            this.cakeBarChartLabels.push(result.result[i].item_id.name);
            tempCake.push(result.result[i].count);
          }
          this.cakeBarChartData[0].data = tempCake;
          // result.result.forEach(cake => {
          //   this.cakeBarChartLabels.push(cake.item_id.name);
          //   this.cakeBarChartData[0].data.push(cake.count);
          // });
        }
      });
  }

  initTablesCount() {
    this.dataService.getCount({type: 'table'})
      .subscribe(result => {
        if (result.success === true) {
          let tempTables = [];
          this.tableBarChartData[0].data = [];
          this.tableCount = result.result;
          console.log('this.tableCount : ', this.tableCount);
          for (let i = 0; i < result.result.length; i++) {
            this.tableBarChartLabels.push('Table ' + result.result[i].table_id.number);
            tempTables.push(result.result[i].count);
          }
          this.tableBarChartData[0].data = tempTables;
          // result.result.forEach(table => {
          //   this.tableBarChartLabels.push(table.table_id.number);
          //   this.tableBarChartData[0].data.push(table.count);
          // });
        }
      });
  }

  initCakeOrdersCount() {
    this.dataService.orderCount({orderType: 'cake'})
      .subscribe(res => {
        if (res.success === true) {
          this.cakeOrdersCount = res.result;
          console.log('this.cakeOrdersCount : ', this.cakeOrdersCount);

          this.ordersChartData = [
            [this.coffeeOrdersCount, this.cakeOrdersCount, this.mixedOrdersCount]
          ];
        }
      });
  }

  initCoffeeOrdersCount() {
    this.dataService.orderCount({orderType: 'coffee'})
      .subscribe(res => {
        if (res.success === true) {
          this.coffeeOrdersCount = res.result;
          console.log('this.coffeeOrdersCount : ', this.coffeeOrdersCount);

          this.ordersChartData = [
            [this.coffeeOrdersCount, this.cakeOrdersCount, this.mixedOrdersCount]
          ];
        }
      });
  }

  initMixedOrdersCount() {
    this.dataService.orderCount({orderType: 'mixed'})
      .subscribe(res => {
        if (res.success === true) {
          this.mixedOrdersCount = res.result;
          console.log('mixedOrdersCount : ', this.mixedOrdersCount);

          this.ordersChartData = [
            [this.coffeeOrdersCount, this.cakeOrdersCount, this.mixedOrdersCount]
          ];
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
