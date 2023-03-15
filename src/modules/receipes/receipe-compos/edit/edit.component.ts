import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import {
  updateRecipe,
  addRecipe,
} from './../../../../store/recipeStore/recipe.actions';
import { RecipeModel } from '../../../../contracts/models/recipe-model';
import { AppStoreStateInterface } from '../../../../contracts/interfaces/app-store-state-interface';

@Component({
  selector: 'a15ngrxstore-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  editReciSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        amount: FormControl<number | null>;
      }>
    >([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.editReciSub = this.store
        .select('recipeReducer')
        .pipe(
          map(({ recipes }: { recipes: RecipeModel[] }) => {
            const target = recipes.find((each, idx) => idx === this.id);
            return target ? target : new RecipeModel('', '', '', []);
          })
        )
        .subscribe((recipe: RecipeModel) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              const currentIngredient = new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              });
              recipeIngredients.push(currentIngredient);
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  public get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        updateRecipe({
          idx: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
    } else {
      this.store.dispatch(addRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel = () => {
    this.router.navigate(['../'], { relativeTo: this.route });
  };

  ngOnDestroy(): void {
    this.editReciSub && this.editReciSub.unsubscribe();
  }
}
