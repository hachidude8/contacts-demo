import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard
  implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.isAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.isAuthenticated();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean | UrlTree {
    const subject = this.authentication.instant();
    if (!subject.isAuthenticated) {
      return this.router.parseUrl('/login');
    }
    return subject.isAuthenticated;
  }

}
