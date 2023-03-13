import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { UserModel } from '../../../../contracts/models/user/user-model';
import {
  storeRecipes,
  fetchRecipes,
} from '../../../../store/recipeStore/recipe.actions';
import { AppStoreStateInterface } from '../../../../contracts/interfaces/app-store-state-interface';
import { Logout } from '../../../../store/authStore/auth.actions';

@Component({
  selector: 'a15ngrxstore-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthened = false;
  private useSub!: Subscription;

  constructor(private store: Store<AppStoreStateInterface>) {}

  ngOnInit(): void {
    this.useSub = this.store
      .select('AuthReducer')
      .pipe(map(({ user }): UserModel | null => user))
      .subscribe((user) => {
        this.isAuthened = !!user;
        console.log('30 -- is User authend? ', this.isAuthened);
      });
  }

  onSaveData() {
    this.store.dispatch(storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  }

  onLogout = () => {
    this.store.dispatch(Logout());
  };

  ngOnDestroy(): void {
    this.useSub && this.useSub.unsubscribe();
  }
}
