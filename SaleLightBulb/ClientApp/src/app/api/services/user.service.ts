// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // post: api/User/updateProfile
  // user
  // api/[controller]/updateProfile
  public updateProfile(user: UserDto): Observable<UserDto> {
    const url = `${this.server}/api/User/updateProfile`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<UserDto>(url, user, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/User
  // null
  // api/[controller]
  public getCurrentUser(): Observable<UserDto> {
    const url = `${this.server}/api/User`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<UserDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/User/GetUsers
  // null
  // api/[controller]/GetUsers
  public getUsers(): Observable<UserDto[]> {
    const url = `${this.server}/api/User/GetUsers`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<UserDto[]>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // get: api/User/GetUserById?userId=${userId}
  // null
  // api/[controller]/GetUserById
  public getUserById(userId: number): Observable<UserDto> {
    const url = `${this.server}/api/User/GetUserById?userId=${encodeURIComponent(userId)}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.get<UserDto>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // delete: api/User/DeleteUser?userId=${userId}
  // null
  // api/[controller]/DeleteUser
  public deleteUser(userId: number): Observable<void> {
    const url = `${this.server}/api/User/DeleteUser?userId=${userId}`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.delete<void>(url, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/User/UpdateUser
  // user
  // api/[controller]/UpdateUser
  public updateUser(user: UserDto): Observable<UserDto> {
    const url = `${this.server}/api/User/UpdateUser`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<UserDto>(url, user, { headers: header }).pipe(catchError(val => this.handleError(val)));
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
