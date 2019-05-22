import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';

export interface DialogData {
  mode: string;
  table: object;
}

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

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.selectedTable = {};
    this.newTableCreated = {};
    this.counter = 0;
    this.mode = 'view';
    this.getTables();
    this.newTable = {
      _id: '',
      number: 0,
      seats: 0
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
    const cfg = {
      width: '600px',
      height: '400px',
      data: {
        mode: 'edit',
        table: tableClicked
      },
      disableClose: true
      // backdropClass: 'dialog-backdrop'
    };
    const tableDialog = this.dialog.open(CreateTableComponent, cfg);

    tableDialog.afterClosed().subscribe(result => {
      this.getTables();
    });
  }

  createTableMode() {
    const cfg = {
      width: '600px',
      height: '400px',
      data: { mode: 'add' }
    };
    const dialogRef = this.dialog.open(CreateTableComponent, cfg);

    dialogRef.afterClosed().subscribe(result => {
      this.getTables();
    });
  }

  editTable(updatedTable) {
    this.dataService.updateTable(updatedTable)
      .subscribe(result => {
        if (result) {
          this.getTables();
        }
      });
    this.mode = 'view';
  }

  cancel() {
    this.mode = 'view';
  }

}

@Component({
  selector: 'app-create-table',
  templateUrl: './dialogs/create-table.html',
  styleUrls: ['./tables.component.css']
})

export class CreateTableComponent implements OnInit {
  table: any;
  title: string;

  constructor(public dialogRef: MatDialogRef<CreateTableComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  ngOnInit() {
    this.initData();
  }

  initData() {
    if (this.data.mode === 'add') {
      this.table = {
        number: '',
        seats: ''
      };
      this.title = 'Create Table';
    } else if (this.data.mode === 'edit') {
      this.table = this.data.table;
      this.title = 'Edit Table';
    }
  }

  submit() {
    if (this.table.seats === null || this.table.seats === undefined ||
      this.table.number === null || this.table.number === undefined ||
      this.table.seats < 1 || this.table.number < 1) {
      alert('Please fill in all the fields with a number > 1');
    } else {
      if (this.data.mode === 'add') {
        this.dataService.createTable(this.table)
          .subscribe(result => {
            if (result.success === true) {
              this.dialogRef.close();
            } else if (result.success === false) {
              alert('Table number must be unique');
            }
          }, err => {
            alert('Table number must be unique');
          });
      } else if (this.data.mode === 'edit') {
        this.dataService.updateTable(this.table)
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

  deleteTable() {


    if (confirm('Are you sure you want to delete ?')) {
      this.dataService.deleteTable(this.table)
        .subscribe(result => {
          if (result) {
            if (result.success === true) {
              this.dialogRef.close();
            } else if (result.success === false) {
              alert('Failed to delete');
            }
          }
        });
    }

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
