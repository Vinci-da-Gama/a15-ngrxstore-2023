import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeModel } from '../../../../contracts/models/recipe-model';
import { IngredientModel } from '../../../../contracts/models/ingredient-model';
import { AddIngredients } from '../../../../store/shoppinglist/sl.actions';
import { AppStoreStateInterface } from '../../../../contracts/interfaces/app-store-state-interface';
import { deleteRecipe } from '../../../../store/recipeStore/recipe.actions';

@Component({
  selector: 'a15ngrxstore-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  recipe!: RecipeModel;
  id!: number;
  targetRecipeSub!: Subscription;
  ingredient!: IngredientModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit(): void {
    this.targetRecipeSub = this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id: number) => {
          this.id = id;
          return this.store.select('recipeReducer');
        }),
        map(({ recipes }) => recipes.find((_, idx) => idx === this.id))
      )
      .subscribe((recipe): void => {
        if (recipe && recipe !== undefined) {
          this.recipe = recipe;
        } else {
          throw new Error('39 -- no such recipe');
        }
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(deleteRecipe({ idx: this.id }));
    this.router.navigate(['/recipes']);
  }

  getIngredientTrackBy = (index: number, ingredient: IngredientModel) =>
    ingredient.name;

  ngOnDestroy(): void {
    this.targetRecipeSub && this.targetRecipeSub.unsubscribe();
  }
}
