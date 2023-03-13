import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  /* tap, */
  withLatestFrom,
} from 'rxjs';

import { setRecipes, storeRecipesFailure } from './recipe.actions';
import { RecipeModel } from './../../contracts/models/recipe-model';
import { RecipeStateInterface } from './../../contracts/interfaces/recipe-state-interface';
import { AppStoreStateInterface } from '../..//contracts/interfaces/app-store-state-interface';
import { RecipeActionTypes } from './../types';

// Define the action creators
class StoreRecipesSuccess implements Action {
  readonly type = RecipeActionTypes.STORE_RECIPES_SUCCESS;

  constructor(public payload: RecipeStateInterface) {}
}

@Injectable()
export class RecipeEffects {
  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<AppStoreStateInterface>
  ) {}

  fetchRecipes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActionTypes.FETCH_RECIPES),
      switchMap(() => {
        return this.httpClient.get<RecipeModel[]>(
          'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        const reformatedRecipes: RecipeModel[] = recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }));
        return setRecipes({ recipes: reformatedRecipes });
      })
    )
  );

  storeRecipes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActionTypes.STORE_RECIPES),
      withLatestFrom(this.store.select('recipeReducer')),
      switchMap(([, { recipes }]) => {
        return this.httpClient
          .put<RecipeStateInterface>(
            'https://angu11-intro-default-rtdb.firebaseio.com/recipes.json',
            recipes
          )
          .pipe(
            // it is store to firebase, no need to update in local state, map need to be updated when you have time.
            map((res) => new StoreRecipesSuccess(res)),
            catchError((errRes: HttpErrorResponse) => {
              console.log('66 -- error: ', errRes);
              let errMsg = 'Unknown error happened...';
              if (errRes.error && errRes.error.error) {
                errMsg = errRes.error.error.message;
              }
              return of(storeRecipesFailure(errMsg)); // or just return storeRecipesFailure(errMsg);
            })
          );
      })
    )
  );
}
