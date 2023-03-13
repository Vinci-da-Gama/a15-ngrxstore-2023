import { Action, createReducer, on } from '@ngrx/store';

import { RecipeStateInterface } from 'src/contracts/interfaces/recipe-state-interface';
import * as ReciActions from './recipe.actions';

export const initialState: RecipeStateInterface = {
  recipes: [],
  errMsg: '',
};

const _recipeReducer = createReducer(
  initialState,
  on(ReciActions.storeRecipesFailure, (state, { errMsg }) => ({
    ...state,
    errMsg,
  })),
  on(ReciActions.setRecipes, (state, { recipes }) => ({
    ...state,
    recipes,
    errMsg: '',
  })),
  on(ReciActions.addRecipe, (state, recipe) => ({
    ...state,
    recipes: [...state.recipes, recipe],
    errMsg: '',
  })),
  on(ReciActions.updateRecipe, (state, { idx, newRecipe }) => {
    const updatedRecipes = [...state.recipes];
    updatedRecipes[idx] = newRecipe;
    return {
      ...state,
      recipes: updatedRecipes,
      errMsg: '',
    };
  }),
  on(ReciActions.deleteRecipe, (state, { idx }) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== idx),
    errMsg: '',
  }))
);

export function recipeReducer(
  state: RecipeStateInterface | undefined,
  action: Action
): RecipeStateInterface {
  return _recipeReducer(state, action);
}
