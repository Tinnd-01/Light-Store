// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { CategoryDto } from '../models/categoryDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // get: api/Category/getAllCategory
  // null
  // api/[controller]/getAllCategory
  public getAllCategory(): Observable<CategoryDto[]> {
    const url = `${this.server}/api/Category/getAllCategory`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<CategoryDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Category/getDashboard
  // null
  // api/[controller]/getDashboard
  public getDashboard(): Observable<CategoryDto[]> {
    const url = `${this.server}/api/Category/getDashboard`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<CategoryDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/Category?categoryId=${categoryId}
  // null
  // api/[controller]
  public getCategory(categoryId: number): Observable<CategoryDto> {
    const url = `${this.server}/api/Category?categoryId=${encodeURIComponent(categoryId)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<CategoryDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
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
