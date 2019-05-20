import {Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {DataService} from '../services/data.service';

export interface DialogData {
  mode: string;
  item: object;
}

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

  constructor(private dataService: DataService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getItems();
    this.mode = 'view';
    this.newItemCreated = {};
    this.coffeeTab = 'tab-active';
    this.cakesTab = 'tab-inactive';
    // this.cakeOptions = ['cake-cherry', 'cake-chocogoodness', 'cake-chocolate', 'cake-greenslime',
    //   'cake-lemonslice', 'cake-messy', 'cake-redvelvet', 'cake-scrumptious', 'cake-skittles'];
    // this.coffeeOptions = ['drink-blue', 'drink-green', 'drink-purple', 'drink-red', 'drink-yellow'];
    this.newItem = {
      id: '',
      name: '',
      price: 0,
      type: 'coffee',
      fileName: ''
    };
    this.options = this.coffeeOptions;
  }


  selectItem(selected) {
    this.newItem = selected;
    this.mode = 'edit';
  }

  switchTab(clickedTab) {
    this.cancel();
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
      });
  }


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
  }

  clearItem() {
    this.newItem = {
      id: '',
      name: '',
      price: 0,
      fileName: ''
    };
  }

  createItemMode() {
    // this.mode = 'create';
    // this.newItemCreated = {};

    // this.clearItem();
    const cfg = {
      width: '600px',
      height: '550px',
      data: { mode: 'add' }
    };
    const dialogRef = this.dialog.open(CreateItemComponent, cfg);

    dialogRef.afterClosed().subscribe(result => {
      this.getItems();
    });
  }

  editItem(updatedItem) {
    this.dataService.updateItem(updatedItem)
      .subscribe(result => {
        if (result) {
          this.clearItem();
          this.getItems();
          this.mode = 'view';
        }
      });
  }

  deleteItem(itemForDelete) {
    this.dataService.deleteItem(itemForDelete)
      .subscribe(result => {
        if (result) {
          this.clearItem();
          this.getItems();
          this.mode = 'view';
        }
      });
  }

  cancel() {
    this.getItems();
    this.mode = 'view';
  }

}

@Component({
  selector: 'app-create-item-component',
  templateUrl: './dialogs/create-item.html',
  styleUrls: ['./items.component.css']
})

export class CreateItemComponent implements OnInit {

  item: any;
  title: string;
  options: any;
  cakeOptions: any;
  coffeeOptions: any;

  constructor(public dialogRef: MatDialogRef<CreateItemComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.initData();
    this.cakeOptions = ['cake-cherry', 'cake-chocogoodness', 'cake-chocolate', 'cake-greenslime',
      'cake-lemonslice', 'cake-messy', 'cake-redvelvet', 'cake-scrumptious', 'cake-skittles'];
    this.coffeeOptions = ['drink-blue', 'drink-green', 'drink-purple', 'drink-red', 'drink-yellow'];
  }

  initData() {
    if (this.data.mode === 'add') {
      this.item = {
        id: '',
        name: '',
        price: 0,
        type: 'coffee',
        fileName: ''
      };
      this.title = 'Create Item';
      this.options = this.coffeeOptions;
    } else if (this.data.mode === 'edit') {
      this.item = this.data.item;
      this.title = 'Edit Item';
    }
  }

}
