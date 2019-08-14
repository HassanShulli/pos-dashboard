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
  }

  initCoffeeCount() {
    this.dataService.getCount({type: 'coffee'})
      .subscribe(result => {
        let temp = [];
        if (result.success === true) {
          this.coffeeBarChartData[0].data = [];
          this.coffeeCount = result.result;
          for (let i = 0; i < result.result.length; i++) {
            if (result.result[i].item_id.name.length > 13) {
              this.coffeeBarChartLabels.push(result.result[i].item_id.name.slice(0, 12) + '..');
            } else {
              this.coffeeBarChartLabels.push(result.result[i].item_id.name);
            }
            temp.push(result.result[i].count);
          }
          this.coffeeBarChartData[0].data = temp;
        }
      });
  }

  initCakeCount() {
    this.dataService.getCount({type: 'cake'})
      .subscribe(result => {
        if (result.success === true) {
          let tempCake = [];
          this.cakeCount = result.result;
          this.cakeBarChartData[0].data = [];
          for (let i = 0; i < result.result.length; i++) {
            if (result.result[i].item_id) {
              if (result.result[i].item_id.name.length > 13) {
                this.cakeBarChartLabels.push(result.result[i].item_id.name.slice(0, 12) + '..');
              } else {
                this.cakeBarChartLabels.push(result.result[i].item_id.name);
              }
            }
            tempCake.push(result.result[i].count);
          }
          this.cakeBarChartData[0].data = tempCake;
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
          for (let i = 0; i < result.result.length; i++) {
            if (result.result[i].table_id) {
              this.tableBarChartLabels.push('Table ' + result.result[i].table_id.number);
            }
            tempTables.push(result.result[i].count);
          }
          this.tableBarChartData[0].data = tempTables;
        }
      });
  }

  initCakeOrdersCount() {
    this.dataService.orderCount({orderType: 'cake'})
      .subscribe(res => {
        if (res.success === true) {
          this.cakeOrdersCount = res.result;

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

          this.ordersChartData = [
            [this.coffeeOrdersCount, this.cakeOrdersCount, this.mixedOrdersCount]
          ];
        }
      });
  }
}
