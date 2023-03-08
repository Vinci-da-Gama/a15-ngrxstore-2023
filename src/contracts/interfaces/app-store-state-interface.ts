import { AuthStateInterface } from './auth-state-interface';
import { RecipeStateInterface } from './recipe-state-interface';
import { ShoppingListStateInterface } from './shopping-list-state-interface';

export interface AppStoreStateInterface {
  shoppingListReducer: ShoppingListStateInterface;
  AuthReducer: AuthStateInterface;
  recipeReducer: RecipeStateInterface;
}
