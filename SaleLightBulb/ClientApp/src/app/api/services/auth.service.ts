// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { SignUpDto } from '../models/signUpDto';
import { LoginDto } from '../models/loginDto';
import { AuthDto } from '../models/authDto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiProxy {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }

  // post: api/Auth/signUp
  // signUp
  // api/[controller]/signUp
  public signUp(signUp: SignUpDto): Observable<void> {
    const url = `${this.server}/api/Auth/signUp`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<void>(url, signUp, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Auth/login
  // login
  // api/[controller]/login
  public login(login: LoginDto): Observable<AuthDto> {
    const url = `${this.server}/api/Auth/login`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<AuthDto>(url, login, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Auth/signOut
  // null
  // api/[controller]/signOut
  public signOut(): Observable<void> {
    const url = `${this.server}/api/Auth/signOut`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<void>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
  }

  // post: api/Auth/reLogin
  // null
  // api/[controller]/reLogin
  public reLogin(): Observable<AuthDto> {
    const url = `${this.server}/api/Auth/reLogin`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.post<AuthDto>(url, null, { headers: header }).pipe(catchError(val => this.handleError(val)));
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
