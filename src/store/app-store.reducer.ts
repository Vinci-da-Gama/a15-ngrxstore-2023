import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { AppStoreStateInterface } from '../contracts/interfaces/app-store-state-interface';
import AuthReducer from './authStore/auth.reducer';
import { recipeReducer } from './recipeStore/recipe.reducer';
import shoppingListReducer from './shoppinglist/sl.reducer';
import * as SlActions from './shoppinglist/sl.actions';

/**
 * if use old way to do action, need to do this;
 * then new way is createAction (auth.actions.ts), it is a function,
 * no need to export action types.
 */
type StoreActionsType = SlActions.SlActionType;

export const appReducers: ActionReducerMap<
  AppStoreStateInterface,
  StoreActionsType
> = {
  shoppingListReducer,
  AuthReducer,
  recipeReducer,
  router: routerReducer,
};
