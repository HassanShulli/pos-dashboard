import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DataService} from '../services/data.service';
import {MainNavComponent} from '../main-nav/main-nav.component';

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
              private nav: MainNavComponent,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.nav.sideNavClass = 'sidenav';
    this.getItems();
    this.mode = 'view';
    this.newItemCreated = {};
    this.coffeeTab = 'tab-active';
    this.cakesTab = 'tab-inactive';
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
    const cfg = {
      width: '600px',
      data: {
        mode: 'edit',
        item: selected
      }
    };

    const itemDialog = this.dialog.open(CreateItemComponent, cfg);

    itemDialog.afterClosed().subscribe(result => {
      this.getItems();
    });
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

  clearItem() {
    this.newItem = {
      id: '',
      name: '',
      price: 0,
      fileName: '',
      type: 'coffee'
    };
  }

  createItemMode() {
    this.clearItem();
    const cfg = {
      width: '600px',
      data: {
        mode: 'add',
        item: this.newItem
      }
    };

    const itemDialog = this.dialog.open(CreateItemComponent, cfg);

    itemDialog.afterClosed().subscribe(result => {
      this.getItems();
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
    this.cakeOptions = ['cake-cherry', 'cake-chocogoodness', 'cake-chocolate', 'cake-greenslime',
      'cake-lemonslice', 'cake-messy', 'cake-redvelvet', 'cake-scrumptious', 'cake-skittles'];
    this.coffeeOptions = ['drink-blue', 'drink-green', 'drink-purple', 'drink-red', 'drink-yellow'];
    this.options = this.coffeeOptions;
    this.initData();
  }

  clearImage() {
    this.item.fileName = '';
  }

  initData() {
    this.item = this.data.item;
    if (this.data.mode === 'add') {
      this.title = 'Create Item';
    } else if (this.data.mode === 'edit') {
      this.item = this.data.item;
      this.title = 'Edit Item';
    }
  }

  submit() {
    if (this.item.name === '' || this.item.fileName === '' ||
      this.item.price === '' || this.item.price === null || this.item.price === undefined ||
      this.item.type === '' || this.item.type === null || this.item.type === undefined
    ) {
      alert('Please fill out all of the fields');
    } else if (this.item.price <= 0) {
      alert('Item price must be more than zero');
    } else {
      if (this.data.mode === 'add') {
        this.dataService.createItem(this.item)
          .subscribe(result => {
            if (result.success === true) {
              this.dialogRef.close();
            } else if (result.success === false) {
              alert('Item creation not successful');
            }
          }, err => {
            alert('Item creation not successful');
          });
      } else if (this.data.mode === 'edit') {
        this.dataService.updateItem(this.item)
          .subscribe(result => {
            if (result.success === true) {
              this.dialogRef.close();
            } else if (result.success === false) {
              alert('Table number must be unique');
            }
          });
      }
    }
  }

  deleteItem() {
    if (confirm('Are you sure you want to delete ?')) {
      this.dataService.deleteItem(this.item)
        .subscribe(result => {
          if (result) {
            this.dialogRef.close();
          } else {
            alert('Failed to delete');
          }
        }, err => {
          alert('Failed to delete');
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
