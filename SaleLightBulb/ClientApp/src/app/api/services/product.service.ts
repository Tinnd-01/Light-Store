// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { ProductDto } from '../models/productDto';

@Injectable({
  providedIn: 'root'
})
export class ProductApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // get: api/Product/GetProductByCategoryId/${categoryId}
  // null
  // api/[controller]/GetProductByCategoryId/{categoryId}
  public getProductByCategoryId(categoryId: number): Observable<ProductDto[]> {
    const url = `${this.server}/api/Product/GetProductByCategoryId/${categoryId}?categoryId=${encodeURIComponent(categoryId)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<ProductDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Product/getProductById/${productId}
  // null
  // api/[controller]/getProductById/{productId}
  public getProductById(productId: number): Observable<ProductDto> {
    const url = `${this.server}/api/Product/getProductById/${productId}?productId=${encodeURIComponent(productId)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<ProductDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Product/addNewProduct
  // product
  // api/[controller]/addNewProduct
  public addNewProduct(product: ProductDto): Observable<ProductDto> {
    const url = `${this.server}/api/Product/addNewProduct`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<ProductDto>(url, product, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // delete: api/Product/removeProduct/${productId}
  // null
  // api/[controller]/removeProduct/{productId}
  public removeProduct(productId: number): Observable<void> {
    const url = `${this.server}/api/Product/removeProduct/${productId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.delete<void>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Product/updateProduct
  // product
  // api/[controller]/updateProduct
  public updateProduct(product: ProductDto): Observable<number> {
    const url = `${this.server}/api/Product/updateProduct`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<number>(url, product, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Product/GetWishListOfCurrentUser
  // null
  // api/[controller]/GetWishListOfCurrentUser
  public getWishListOfCurrentUser(): Observable<ProductDto[]> {
    const url = `${this.server}/api/Product/GetWishListOfCurrentUser`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<ProductDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Product/AddToWishListOfCurrentUser/${productId}
  // null
  // api/[controller]/AddToWishListOfCurrentUser/{productId}
  public addToWishListOfCurrentUser(productId: number): Observable<boolean> {
    const url = `${this.server}/api/Product/AddToWishListOfCurrentUser/${productId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<boolean>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Product/search?search=${encodeURIComponent(search)}
  // null
  // api/[controller]/search
  public search(search: string): Observable<ProductDto[]> {
    const url = `${this.server}/api/Product/search?search=${encodeURIComponent(search)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<ProductDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
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
