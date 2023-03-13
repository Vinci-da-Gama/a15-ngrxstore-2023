import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IngredientModel } from './../../../contracts/models/ingredient-model';
import { AppStoreStateInterface } from '../../../contracts/interfaces/app-store-state-interface';
import { selectSlList } from './../../../store/shoppinglist/sl.selectors';
import * as SlActions from '../../../store/shoppinglist/sl.actions';

@Component({
  selector: 'a15ngrxstore-sl-list',
  templateUrl: './sl-list.component.html',
  styleUrls: ['./sl-list.component.scss'],
})
export class SlListComponent implements OnInit {
  public slState$!: Observable<{ ingredients: IngredientModel[] }>;

  constructor(private store: Store<AppStoreStateInterface>) {}

  ngOnInit(): void {
    this.slState$ = this.store.select(selectSlList);
  }

  onEditItem(index: number) {
    this.store.dispatch(new SlActions.StartEditIngredient(index));
  }
}
