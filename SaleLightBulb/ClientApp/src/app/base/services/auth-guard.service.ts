import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteConstant } from '../constants';
import { StatusService } from './status.service';
import { AuthResolverService } from './auth-resolver.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthResolverService,
    private statusService: StatusService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.statusService.statusCode = 0;

    return this.authService.isLogin$.pipe(
      map((isLogin) => {
        if (isLogin) {
          return true;
        }

        this.router.navigate([RouteConstant.SIGN_IN]);
        return false;
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
