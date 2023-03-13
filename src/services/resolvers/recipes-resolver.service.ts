import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, take } from 'rxjs';

import { fetchRecipes } from './../../store/recipeStore/recipe.actions';
import { AppStoreStateInterface } from 'src/contracts/interfaces/app-store-state-interface';
import { RecipeActionTypes } from 'src/store/types';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService {
  constructor(
    /* private dataStorageService: DataStorageService,
    private recipesService: RecipeService, */
    private actions$: Actions,
    private store: Store<AppStoreStateInterface>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    } */
    return this.store.select('recipeReducer').pipe(
      take(1),
      map(({ recipes }) => recipes),
      switchMap((recipes) => {
        if (!recipes || recipes.length <= 0) {
          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActionTypes.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
