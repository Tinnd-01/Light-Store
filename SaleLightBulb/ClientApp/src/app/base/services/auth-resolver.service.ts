import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Model } from '../model';
import { UserDto } from 'src/app/api/models/userDto';
import { BehaviorSubject } from 'rxjs';
import { AuthDto } from 'src/app/api/models/authDto';
import { Role } from 'src/app/api/models/role';
import { CartApiProxy } from 'src/app/api/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolverService {
  constructor(
    private localStorageService: LocalStorageService,
    private cartService: CartApiProxy
  ) {}
  private _currentUser = Model.create<UserDto | null>(null);
  public cartLength$ = new BehaviorSubject<number>(0);
  public isLogin$ = new BehaviorSubject<boolean>(false);

  get currentUser() {
    return this._currentUser.get();
  }

  set currentUser(value: UserDto | null) {
    this._currentUser.set(value);
  }

  get authToken() {
    return this.localStorageService.getAuthToken();
  }

  setAuthData(auth: AuthDto) {
    this.currentUser = auth.currentUser;
    this.cartLength$.next(auth.currentUser.cartLength);
    this.isLogin$.next(true);
    this.localStorageService.setAuthToken(auth.accessToken);
  }

  resetAuthData() {
    this.currentUser = null;
    this.isLogin$.next(false);
    this.localStorageService.removeAuthToken();
  }

  get isAdmin() {
    return this.currentUser?.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser?.role === Role.User;
  }

  reloadCartLength() {
    this.cartService.getCartLengthOfCurrentUSer().subscribe((x) => {
      this.currentUser!.cartLength = x;
      this.cartLength$.next(x);
    });
  }
}
