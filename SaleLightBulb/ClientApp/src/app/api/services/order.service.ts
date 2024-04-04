// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { ProductDto } from '../models/productDto';
import { OrderDto } from '../models/orderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // post: api/Order/orderNow/${idProduct}
  // null
  // api/[controller]/orderNow/{idProduct}
  public orderNow(idProduct: number): Observable<ProductDto> {
    const url = `${this.server}/api/Order/orderNow/${idProduct}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<ProductDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Order/getOrdersOfCurrentUser
  // null
  // api/[controller]/getOrdersOfCurrentUser
  public getOrdersOfCurrentUser(): Observable<OrderDto[]> {
    const url = `${this.server}/api/Order/getOrdersOfCurrentUser`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<OrderDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Order/getOrderById/${orderId}
  // null
  // api/[controller]/getOrderById/{orderId}
  public getOrderById(orderId: number): Observable<OrderDto> {
    const url = `${this.server}/api/Order/getOrderById/${orderId}?orderId=${encodeURIComponent(orderId)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<OrderDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Order/decreaseProductAmount/${orderId}
  // null
  // api/[controller]/decreaseProductAmount/{orderId}
  public decreaseProductAmount(orderId: number): Observable<OrderDto> {
    const url = `${this.server}/api/Order/decreaseProductAmount/${orderId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<OrderDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Order/increaseProductAmount/${orderId}
  // null
  // api/[controller]/increaseProductAmount/{orderId}
  public increaseProductAmount(orderId: number): Observable<OrderDto> {
    const url = `${this.server}/api/Order/increaseProductAmount/${orderId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<OrderDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // delete: api/Order/removeOrder/${orderId}
  // null
  // api/[controller]/removeOrder/{orderId}
  public removeOrder(orderId: number): Observable<void> {
    const url = `${this.server}/api/Order/removeOrder/${orderId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.delete<void>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Order/updateOrderAddress/${orderId}/${addressId}
  // null
  // api/[controller]/updateOrderAddress/{orderId}/{addressId}
  public updateOrderAddress(orderId: number, addressId: number): Observable<OrderDto> {
    const url = `${this.server}/api/Order/updateOrderAddress/${orderId}/${addressId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<OrderDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // Utility
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    let customError = '';
    if (error.error) {
      customError = error.error;
    }
    return throwError(() => customError || 'Server error');
  }
}
