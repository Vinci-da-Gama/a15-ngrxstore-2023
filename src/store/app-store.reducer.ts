import { ActionReducerMap } from '@ngrx/store';

import { AppStoreStateInterface } from 'src/contracts/interfaces/app-store-state-interface';
import AuthReducer from './authStore/auth.reducer';

/**
 * if use old way to do action, need to do this;
 * then new way is createAction (auth.actions.ts), it is a function,
 * no need to export action types.
 */
// type StoreActionsType = SlActions.SlActionType;

export const appReducers: ActionReducerMap<any> =
  // StoreActionsType
  {
    // shoppingListReducer,
    AuthReducer,
  };
