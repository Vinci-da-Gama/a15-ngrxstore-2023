import { ShoppingListStateInterface } from './../../contracts/interfaces/shopping-list-state-interface';
import { IngredientModel } from './../../contracts/models/ingredient-model';
import { ShoppingListActionTypes } from '../types';
import * as ShoppingListActions from './sl.actions';

const slInitState: ShoppingListStateInterface = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ],
  editedIngredient: {
    name: '',
    amount: -1,
  },
  editedIngredientIndex: -1,
};

// for update ingredient, avoid Unexpected lexical declaration in case block.eslintno-case-declarations error
let existIngredient: IngredientModel = new IngredientModel('exist', 0);
let updatedIngredient: IngredientModel = new IngredientModel('updated', 0);
let ingredients: IngredientModel[] = [];

export default (
  state = slInitState,
  { type, payload }: ShoppingListActions.SlActionType
): ShoppingListStateInterface => {
  switch (type) {
    case ShoppingListActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, <IngredientModel>payload],
      };
    case ShoppingListActionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(payload as IngredientModel[])],
      };
    case ShoppingListActionTypes.UPDATE_INGREDIENT:
      existIngredient = state.ingredients[state.editedIngredientIndex];
      updatedIngredient = {
        ...existIngredient,
        ...(payload as IngredientModel),
      };
      ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients,
        editedIngredient: {
          name: '',
          amount: -1,
        },
        editedIngredientIndex: -1,
      };
    case ShoppingListActionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, idx) => idx !== state.editedIngredientIndex
        ),
        editedIngredient: {
          name: '',
          amount: -1,
        },
        editedIngredientIndex: -1,
      };
    case ShoppingListActionTypes.START_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: state.ingredients[payload as number],
        editedIngredientIndex: payload as number,
      };
    case ShoppingListActionTypes.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: {
          name: '',
          amount: -1,
        },
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
};
