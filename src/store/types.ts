// shopping list
export enum ShoppingListActionTypes {
  ADD_INGREDIENT = '[companyName]/shoppinglist-ADD_INGREDIENT',
  ADD_INGREDIENTS = '[companyName]/shoppinglist-ADD_INGREDIENTS',
  UPDATE_INGREDIENT = '[companyName]/shoppinglist-UPDATE_INGREDIENT',
  DELETE_INGREDIENT = '[companyName]/shoppinglist-DELETE_INGREDIENT',
  START_EDIT_INGREDIENT = '[companyName]/shoppinglist-START_EDIT_INGREDIENT',
  STOP_EDIT_INGREDIENT = '[companyName]/shoppinglist-STOP_EDIT_INGREDIENT',
}

// authentication
export const LOGIN_START = '[companyName]/authentication-LOGIN_START';
export const SIGNUP_START = '[companyName]/authentication-SIGNUP_START';
export const AUTO_LOGIN = '[companyName]/authentication-AUTO_LOGIN';
export const AUTHENTICATE_SUCCESS =
  '[companyName]/authentication-AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL =
  '[companyName]/authentication-AUTHENTICATE_FAIL';
export const AUTHENTICATE_CLEAR_ERROR =
  '[companyName]/authentication-AUTHENTICATE_CLEAR_ERROR';
export const LOGOUT = '[companyName]/authentication-LOGOUT';
export const AUTO_LOGOUT = '[companyName]/authentication-AUTO_LOGOUT';

// recipes
export enum RecipeActionTypes {
  SET_RECIPES = '[companyName]/recipes-SET_RECIPES',
  FETCH_RECIPES = '[companyName]/recipes-FETCH_RECIPES',
  STORE_RECIPES = '[companyName]/recipes-STORE_RECIPES',
  STORE_RECIPES_SUCCESS = '[companyName]/recipes-STORE_RECIPES_SUCCESS',
  STORE_RECIPES_FAILURE = '[companyName]/recipes-STORE_RECIPES_FAILURE',
  ADD_RECIPE = '[companyName]/recipes-ADD_RECIPE',
  UPDATE_RECIPE = '[companyName]/recipes-UPDATE_RECIPE',
  DELETE_RECIPE = '[companyName]/recipes-DELETE_RECIPE',
}
