import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStoreStateInterface } from '../../../contracts/interfaces/app-store-state-interface';
import { Logout } from '../../../store/authStore/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  private tokenExpirationTimer: number = 0;

  constructor(
    private httpCli: HttpClient,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  /**
   * setLogoutTimer
   */
  public setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = Number(
      setTimeout(() => {
        this.store.dispatch(Logout());
      }, expirationDuration)
    );
  }

  /**
   * clearLogoutTimer
   */
  public clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = 0;
  }
}
