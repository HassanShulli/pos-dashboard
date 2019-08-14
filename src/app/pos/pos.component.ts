import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {MainNavComponent} from '../main-nav/main-nav.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  providers: [DataService]
})
export class PosComponent implements OnInit {
  tables: any;
  items: any;
  newOrder: any;
  coffeeTab: string;
  cakesTab: string;
  mode: string;
  newItem: object;
  orderTotal: number;
  selectedTable: any;

  constructor(private dataService: DataService,
              private nav: MainNavComponent) {
  }

  ngOnInit() {
    this.nav.sideNavClass = 'sidenav';
    this.selectedTable = '';
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

  onResize(event) {
    console.log('event.target.innerWidth : ', event.target.innerWidth);
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
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
    this.selectedTable = tableForOrder._id;
    this.newOrder.table = {
      _id: tableForOrder._id,
      number: tableForOrder.number
    };
    this.mode = 'order';
  }

  submitOrder(orderForCreate) {
    console.log('orderForCreate : ', orderForCreate);
    if (orderForCreate.items.length === 0) {
      window.alert('No items were added');
    } else {
      this.dataService.createOrder(orderForCreate)
        .subscribe(result => {
          if (result) {
            this.clearOrder();
            this.mode = 'noOrder';
            this.selectedTable = '';
          }
        });
    }
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
    let isPresent = false;
    console.log('itemAdded : ', itemAdded);
    this.newItem = {
      itemId: itemAdded._id,
      itemName: itemAdded.name,
      itemQuantity: 1,
      itemPrice: itemAdded.price,
      itemType: itemAdded.type
    };

    if (this.newOrder.items.length === 0) {
      this.newOrder.items.push(this.newItem);
    } else {
      for (let j = 0; j < this.newOrder.items.length; j++) {
        if (this.newOrder.items[j].itemId === itemAdded._id) {

          this.newOrder.items[j].itemQuantity++;
          isPresent = true;
          break;
        }

        if (j === this.newOrder.items.length - 1) {
          if (isPresent === false) {
            this.newOrder.items.push({
              itemId: itemAdded._id,
              itemName: itemAdded.name,
              itemQuantity: 0,
              itemPrice: itemAdded.price,
              itemType: itemAdded.type
            });
          }
        }
      }
    }
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
      tempTotal += (eachItem.itemQuantity * eachItem.itemPrice);
    });
    this.newOrder.total = tempTotal;
  }
}
