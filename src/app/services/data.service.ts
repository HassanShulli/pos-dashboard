import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const apiURL = 'http://localhost:3000/'; // for local use
// const apiURL = ''; //for heroku deployment

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  appendHeader(header, content) {
    this.headers = this.headers.append(header, content);
  }

  // Login

  login(body): Observable<any> {
    return this.http.post(`${apiURL}login`, body)
      .pipe(
        tap(result => {
          console.log('login():', result);
        }),
        catchError(this.handleError('login()'))
      );
  }

  // Items

  getItems(): Observable<any> {
    return this.http.request('get', `${apiURL}item/read`, {headers: this.headers})
      .pipe(
        tap(result => {
          console.log('getItems():', result);
        }),
        catchError(this.handleError('getItems()'))
      );
  }

  createItem(newItem): Observable<any> {
    return this.http.post(`${apiURL}item/create`, newItem)
      .pipe(
        tap(result => {
          console.log('createItem() : ', result);
        }),
        catchError(this.handleError('createItem()'))
      );
  }


  updateItem(updatedItem): Observable<any> {
    console.log('updatedItem : ', updatedItem);
    return this.http.put(`${apiURL}item/update`, updatedItem)
      .pipe(
        tap(result => {
          console.log('updateItem() : ', result);
        }),
        catchError(this.handleError('updateItem()'))
      );
  }

  deleteItem(deleteItem) {
    return this.http.delete(`${apiURL}item/delete/${deleteItem._id}`)
      .pipe(
        tap(result => {
          console.log('deleteItem() : ', result);
        }),
        catchError(this.handleError('deleteItem()'))
      );
  }

  // Tables

  getAllTables(): Observable<any> {
    this.appendHeader('Content-Type', 'application/json');
    return this.http.request('get', `${apiURL}table/read`, {headers: this.headers})
      .pipe(
        tap(result => {
          console.log('getTables():', result);
        }),
        catchError(this.handleError('getAllTables()')),
      );
  }

  createTable(newTable): Observable<any> {
    return this.http.post(`${apiURL}table/create`, newTable)
      .pipe(
        tap(result => {
          console.log('createTables():', result);
        }),
        catchError(this.handleError('createTable()')),
      );
  }

  updateTable(updatedTable): Observable<any> {
    return this.http.put(`${apiURL}table/update`, updatedTable)
      .pipe(
        tap(result => {
          console.log('updateTable():', result);
        }),
        catchError(this.handleError('updateTable()'))
      );
  }

  deleteTable(deletedTable): Observable<any> {
    return this.http.delete(`${apiURL}table/delete/${deletedTable._id}`)
      .pipe(
        tap(result => {
          console.log('deleteTable():', result);
        }),
        catchError(this.handleError('deleteTable()'))
      );
  }

  // Orders
  getOrders(pageIndex, limit): Observable<any> {
    return this.http.get(`${apiURL}order/read?pageIndex=${pageIndex}&limit=${limit}`)
    .pipe(
      tap(result => {
        console.log('readOrders()');
      }),
      catchError(this.handleError('readOrders'))
    );
  }

  createOrder(neworder): Observable<any> {
    return this.http.post(`${apiURL}order/create`, neworder)
      .pipe(
        tap(result => {
          console.log('createOrder():', result);

        }),
        catchError(this.handleError('createOrder()')),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
