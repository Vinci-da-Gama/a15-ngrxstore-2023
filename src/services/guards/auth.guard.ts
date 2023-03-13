import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppStoreStateInterface } from '../../contracts/interfaces/app-store-state-interface';
import { UserModel } from '../../contracts/models/user/user-model';
import { AuthenService } from '../external/authen/authen.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authServ: AuthenService,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('AuthReducer').pipe(
      map(({ user }): UserModel | null => user),
      map((user) => (user ? true : this.router.createUrlTree(['/auth'])))
    );
  }

  /* canLoad( // still has error
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(
      new ActivatedRouteSnapshot(), // pass an empty snapshot object
      null // pass null as the second argument
    );
  } */
}
