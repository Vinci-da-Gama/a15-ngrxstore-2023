import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserModel } from './../../contracts/models/user/user-model';
import { AuthenService } from '../external/authen/authen.service';
import { AppStoreStateInterface } from 'src/contracts/interfaces/app-store-state-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authServ: AuthenService,
    private store: Store<AppStoreStateInterface>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('AuthReducer').pipe(
      take(1),
      map(({ user }): UserModel | null => user),
      exhaustMap((user: UserModel | null) => {
        if (!user) {
          return next.handle(req);
        }
        const hasUserTokenReq = req.clone({
          params: new HttpParams().set('auth', String(user.token)),
        });
        return next.handle(hasUserTokenReq);
      })
    );
  }
}
