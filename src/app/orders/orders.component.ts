import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [DataService]
})
export class OrdersComponent implements OnInit {
  tables: any;
  items: any;
  newOrder: any;
  coffeeTab: string;
  cakesTab: string;
  mode: string;
  newItem: object;
  orderTotal: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getItems();
    this.getTables();
    this.coffeeTab = 'tab-active';
    this.cakesTab = 'tab-inactive';
    this.mode = 'noOrder';
    this.newOrder = {
      id: '',
      table: 0,
      items: [],
      total: 0
    };
    this.orderTotal = 0;
  }

  printPage() {
    window.print();
  }

  getItems() {
    this.dataService.getItems()
      .subscribe(result => {
        if (result) {
          this.items = result.result;
        }
      });
  }

  getTables() {
    this.dataService.getAllTables()
      .subscribe(result => {
        if (result) {
          this.tables = result.result;
        }
      });
  }

  startOrder(tableForOrder) {
    this.newOrder.table = tableForOrder.number;
    this.mode = 'order';
    console.log('this.newOrder : ', this.newOrder);
  }

  submitOrder(orderForCreate) {
    this.dataService.createOrder(orderForCreate)
      .subscribe(result => {
        if (result) {
          this.clearOrder();
          this.mode = 'noOrder';
        }
      });
  }

  clearOrder() {
    this.newOrder = {
      id: '',
      table: 0,
      items: [],
      total: 0
    };
  }

  addToOrder(itemAdded) {
    this.newItem = {
      itemName: itemAdded.name,
      itemQuantity: 1,
      itemPrice: itemAdded.price
    };
    this.newOrder.items.push(this.newItem);
  }

  switchTab(clickedTab) {
    if (clickedTab === 'coffeeTab') {
      this.cakesTab = 'tab-inactive';
      this.coffeeTab = 'tab-active';
    } else if (clickedTab === 'cakesTab') {
      this.cakesTab = 'tab-active';
      this.coffeeTab = 'tab-inactive';
    }
  }

  quantitySize(action, index) {
    if (action === 'increment') {
      this.newOrder.items[index].itemQuantity++;
    } else if (action === 'decrement') {
      if (this.newOrder.items[index].itemQuantity > 1) {
        this.newOrder.items[index].itemQuantity--;
      }
    }
  }

  calcTotal() {
    this.orderTotal = 0;
    let tempTotal = 0;
    this.newOrder.items.forEach(function (eachItem) {
      console.log('calcTotal called :  this.newOrder : ', eachItem.itemQuantity + eachItem.itemPrice);
      tempTotal += (eachItem.itemQuantity * eachItem.itemPrice);
    });
    this.orderTotal = tempTotal;
  }
}
