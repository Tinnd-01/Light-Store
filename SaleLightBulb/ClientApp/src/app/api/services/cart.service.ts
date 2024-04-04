// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { CartDto } from '../models/cartDto';
import { OrderDto } from '../models/orderDto';

@Injectable({
  providedIn: 'root'
})
export class CartApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // get: api/Cart/GetCartOfCurrentUser
  // null
  // api/[controller]/GetCartOfCurrentUser
  public getCartOfCurrentUser(): Observable<CartDto[]> {
    const url = `${this.server}/api/Cart/GetCartOfCurrentUser`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<CartDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Cart/addProductToCart/${productId}
  // null
  // api/[controller]/addProductToCart/{productId}
  public addProductToCart(productId: number): Observable<CartDto> {
    const url = `${this.server}/api/Cart/addProductToCart/${productId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<CartDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // delete: api/Cart/deleteCart/${cartId}
  // null
  // api/[controller]/deleteCart/{cartId}
  public deleteCart(cartId: number): Observable<CartDto> {
    const url = `${this.server}/api/Cart/deleteCart/${cartId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.delete<CartDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Cart/orderProductInCart/${cartId}
  // null
  // api/[controller]/orderProductInCart/{cartId}
  public orderProductInCart(cartId: number): Observable<OrderDto> {
    const url = `${this.server}/api/Cart/orderProductInCart/${cartId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<OrderDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Cart/increaseProductAmount/${cartId}
  // null
  // api/[controller]/increaseProductAmount/{cartId}
  public increaseProductAmount(cartId: number): Observable<CartDto> {
    const url = `${this.server}/api/Cart/increaseProductAmount/${cartId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<CartDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Cart/decreaseProductAmount/${cartId}
  // null
  // api/[controller]/decreaseProductAmount/{cartId}
  public decreaseProductAmount(cartId: number): Observable<CartDto> {
    const url = `${this.server}/api/Cart/decreaseProductAmount/${cartId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<CartDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Cart/GetCartLengthOfCurrentUSer
  // null
  // api/[controller]/GetCartLengthOfCurrentUSer
  public getCartLengthOfCurrentUSer(): Observable<number> {
    const url = `${this.server}/api/Cart/GetCartLengthOfCurrentUSer`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<number>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
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
