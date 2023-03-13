import { Action } from '@ngrx/store';

import { ShoppingListActionTypes } from '../types';
import { IngredientModel } from './../../contracts/models/ingredient-model';

export class AddIngredient implements Action {
  readonly type: string = ShoppingListActionTypes.ADD_INGREDIENT;
  constructor(public payload: IngredientModel) {}
}

export class AddIngredients implements Action {
  readonly type: string = ShoppingListActionTypes.ADD_INGREDIENTS;
  constructor(public payload: IngredientModel[]) {}
}

export class UpdateIngredient implements Action {
  readonly type: string = ShoppingListActionTypes.UPDATE_INGREDIENT;
  constructor(public payload: IngredientModel) {}
}

export class DeleteIngredient implements Action {
  readonly type: string = ShoppingListActionTypes.DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type: string = ShoppingListActionTypes.START_EDIT_INGREDIENT;
  constructor(public payload: number) {}
}

export class StopEditIngredient implements Action {
  readonly type: string = ShoppingListActionTypes.STOP_EDIT_INGREDIENT;
}

export type SlActionType =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  // | DeleteIngredient
  | StartEditIngredient;
// | StopEditIngredient;
