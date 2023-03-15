import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

import { AppStoreStateInterface } from '../../../../contracts/interfaces/app-store-state-interface';
import { RecipeModel } from '../../../../contracts/models/recipe-model';

@Component({
  selector: 'a15ngrxstore-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('recipeReducer')
      .pipe(map(({ recipes }) => recipes))
      .subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
