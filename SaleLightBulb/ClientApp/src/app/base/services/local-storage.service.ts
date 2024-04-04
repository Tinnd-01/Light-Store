import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly AUTH_TOKEN = 'authToken';

  public setAuthToken(token: string | null | undefined): void {
    if (token) {
      sessionStorage.setItem(this.AUTH_TOKEN, token);
    }
  }

  public getAuthToken(): string | null {
    return sessionStorage.getItem(this.AUTH_TOKEN);
  }

  public removeAuthToken() {
    sessionStorage.removeItem(this.AUTH_TOKEN);
  }
}
