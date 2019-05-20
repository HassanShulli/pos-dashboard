import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  // activityColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  activityColumns: string[] = ['createdAt', 'table', 'items', 'total'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) { }


  activities: any;
  table: any = {};
  activitiesDataSource: any;
  filteredOrders: any;

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.dataService.getOrders(0, 10)
      .subscribe(result => {
        if (result) {
          this.activities = result.docs;
          this.activitiesDataSource = new MatTableDataSource(result.docs);
          this.initPaginator(result.pagination.page, result.pagination.limit, result.pagination.total);
        }
      });
  }

  initPaginator(pageIndex, pageSize, length) {
    this.table.pageIndex = pageIndex;
    this.table.pageSize = pageSize;
    this.table.length = length;
  }

  onPageChange(evt) {
    this.getOrders(evt.pageIndex, evt.pageSize);
  }

  filterTable(input) {
    this.filteredOrders = [];
    for (const h of this.activities) {
      const keys = Object.keys(h);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'createdAt') {
          if (h[keys[i]].toUpperCase().includes(input.toUpperCase())) {
            this.filteredOrders.push(h);
            break;
          }
        } else if (keys[i] === 'table') {
          if (h[keys[i]].toString() === input) {
            this.filteredOrders.push(h);
            break;
          }
        }
      }
    }
    this.activitiesDataSource = new MatTableDataSource(this.filteredOrders);
  }

  getOrders(pageIndex, limit) {
    this.activities = [];
    this.dataService.getOrders(pageIndex, limit)
      .subscribe(result => {
        if (result) {
          this.activities = result;
          this.activitiesDataSource = new MatTableDataSource(result.docs);
          this.initPaginator(result.pagination.page, result.pagination.limit, result.pagination.total);
        }
      }, err => {
      });
  }


}
