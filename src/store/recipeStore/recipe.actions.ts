import { createAction, props } from '@ngrx/store';

import { RecipeModel } from './../../contracts/models/recipe-model';
import { RecipeActionTypes } from '../types';

export const setRecipes = createAction(
  RecipeActionTypes.SET_RECIPES,
  props<{ recipes: RecipeModel[] }>()
);
export const fetchRecipes = createAction(RecipeActionTypes.FETCH_RECIPES);
export const storeRecipes = createAction(RecipeActionTypes.STORE_RECIPES);
export const storeRecipesFailure = createAction(
  RecipeActionTypes.STORE_RECIPES_FAILURE,
  // props<{ errMsg: string }>
  (errMsg: string) => ({ errMsg })
);
export const addRecipe = createAction(
  RecipeActionTypes.ADD_RECIPE,
  props<RecipeModel>()
);
export const updateRecipe = createAction(
  RecipeActionTypes.UPDATE_RECIPE,
  props<{ idx: number; newRecipe: RecipeModel }>()
);
export const deleteRecipe = createAction(
  RecipeActionTypes.DELETE_RECIPE,
  props<{ idx: number }>()
);
