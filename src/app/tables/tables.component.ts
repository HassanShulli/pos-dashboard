import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [DataService]
})
export class TablesComponent implements OnInit {

  newTable: any;
  newTableCreated: any;
  mode: string;
  counter: number;
  tables: any;
  selectedTable: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.selectedTable = {};
    this.newTableCreated = {};
    this.counter = 0;
    this.mode = 'view';
    this.getTables();
    this.newTable = {
      id: '',
      number: '',
      seats: ''
    };
  }

  getTables() {
    this.dataService.getAllTables()
      .subscribe(result => {
        if (result) {
          this.tables = result.result;
        }
      });
  }

  selectTable(tableClicked) {
    this.newTable = tableClicked;
    this.mode = 'edit';
  }

  createTableMode() {
    this.mode = 'create';
    this.newTableCreated = {};
    this.clearTable();
  }

  createTable() {
    if (this.newTable.seats === null || this.newTable.seats === undefined ||
      this.newTable.number === null || this.newTable.number === undefined ||
      this.newTable.seats < 1 || this.newTable.number < 1) {
      alert('Please fill in all the fields with a number > 1');
    } else {
      this.dataService.createTable(this.newTable)
        .subscribe(result => {
          if (result) {
            if (result.success === false) {
              alert('Please Ensure that the inserted table number is unique');
            } else {
              this.getTables();
            }
          }
        });
      this.mode = 'view';
    }
  }

  clearTable() {
    this.newTable = {
      id: '',
      number: '',
      seats: ''
    };
  }

  editTable(updatedTable) {
    this.dataService.updateTable(updatedTable)
      .subscribe(result => {
        if (result) {
          console.log('result  : ', result);
          this.getTables();
        }
      });
    this.clearTable();
    this.mode = 'view';
  }

  deleteTable(tableForDelete) {
    this.dataService.deleteTable(tableForDelete)
      .subscribe(result => {
        if (result) {
          this.getTables();
        }
      });
    this.clearTable();
    this.mode = 'view';
  }

  cancel() {
    this.mode = 'view';
  }

}
