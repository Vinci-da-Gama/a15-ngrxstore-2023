import { createFeatureSelector } from '@ngrx/store';

import { ShoppingListStateInterface } from 'src/contracts/interfaces/shopping-list-state-interface';

export const selectSlList = createFeatureSelector<ShoppingListStateInterface>(
  'shoppingListReducer'
);
