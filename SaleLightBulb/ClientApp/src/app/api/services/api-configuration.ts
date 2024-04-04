import { LocalStorageService } from './../../base/services/local-storage.service';
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  constructor(private localStorageService: LocalStorageService) {}
  apiUrl = 'https://localhost:7028';
  get authenToken(): string {
    return this.localStorageService.getAuthToken() ?? '';
  }
}
