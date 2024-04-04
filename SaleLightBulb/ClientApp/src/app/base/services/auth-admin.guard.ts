import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthResolverService } from './auth-resolver.service';
import { StatusService } from './status.service';
import { RouteConstant } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthResolverService,
    private statusService: StatusService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.statusService.statusCode = 0;

    return this.authService.isLogin$.pipe(
      map((isLogin) => {
        if (isLogin) {
          if (this.authService.isAdmin) {
            return true;
          }
          this.router.navigate([RouteConstant.PAGE_NOT_FOUND]);
          return false;
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
