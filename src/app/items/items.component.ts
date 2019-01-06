import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [DataService]
})
export class ItemsComponent implements OnInit {

  newItem: any;
  items: any;
  mode: string;
  newItemCreated: any;
  coffeeTab: string;
  cakesTab: string;
  cakeOptions: any;
  coffeeOptions: any;
  options: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getItems();
    this.mode = 'view';
    this.newItemCreated = {};
    this.coffeeTab = 'tab-active';
    this.cakesTab = 'tab-inactive';
    this.cakeOptions = ['cake-cherry', 'cake-chocogoodness', 'cake-chocolate', 'cake-greenslime',
      'cake-lemonslice', 'cake-messy', 'cake-redvelvet', 'cake-scrumptious', 'cake-skittles'];
    this.coffeeOptions = ['drink-blue', 'drink-green', 'drink-purple', 'drink-red', 'drink-yellow'];
    this.newItem = {
      id: '',
      name: "",
      price: 0,
      type: "coffee",
      fileName: ""
    };
    this.options = this.coffeeOptions;
  }


  selectItem(selected) {
    this.newItem = selected;
    this.mode = 'edit';
  }

  switchTab(clickedTab) {
    if (clickedTab === 'coffeeTab') {
      this.cakesTab = 'tab-inactive';
      this.coffeeTab = 'tab-active';
      this.options = this.coffeeOptions;
      this.newItem.type = 'coffee';
    } else if (clickedTab === 'cakesTab') {
      this.cakesTab = 'tab-active';
      this.coffeeTab = 'tab-inactive';
      this.newItem.type = 'cake';
      this.options = this.cakeOptions;
    }
  }

  getItems() {
    this.dataService.getItems()
      .subscribe(result => {
        if (result) {
          this.items = result.result;
        }
      })
  };


  createItem() {
    if (this.newItem.name === '' || this.newItem.fileName === '' ||
      this.newItem.price === null || this.newItem.price === undefined) {
      alert('Please fill out all of the fields');
    } else {
      this.newItemCreated = {
        id: '',
        name: this.newItem.name,
        price: this.newItem.price,
        type: this.newItem.type,
        fileName: this.newItem.fileName
      };
      this.dataService.createItem(this.newItemCreated)
        .subscribe(result => {
          if (result) {
            this.getItems();
          }
        });
      this.mode = 'view';
    }
  };

  clearItem() {
    this.newItem = {
      id: '',
      name: '',
      price: 0,
      fileName: ''
    };
  }

  createItemMode() {
    this.mode = 'create';
    this.newItemCreated = {};

    this.clearItem();
  };

  editItem(updatedItem) {
    this.dataService.updateItem(updatedItem)
      .subscribe(result => {
        if (result) {
          this.clearItem();
          this.getItems();
          this.mode = 'view';
        }
      })
  };

  deleteItem(itemForDelete) {
    this.dataService.deleteItem(itemForDelete)
      .subscribe(result => {
        if (result) {
          this.clearItem();
          this.getItems();
          this.mode = 'view';
        }
      })
  }

  cancel() {
    this.getItems();
    this.mode = 'view';
  }

}
