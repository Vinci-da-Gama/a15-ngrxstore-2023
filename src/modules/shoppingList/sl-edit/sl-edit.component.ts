import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppStoreStateInterface } from 'src/contracts/interfaces/app-store-state-interface';
import { IngredientModel } from './../../../contracts/models/ingredient-model';
import * as SlActions from '../../../store/shoppinglist/sl.actions';

@Component({
  selector: 'a15ngrxstore-sl-edit',
  templateUrl: './sl-edit.component.html',
  styleUrls: ['./sl-edit.component.scss'],
})
export class SlEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: IngredientModel;

  constructor(private store: Store<AppStoreStateInterface>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingListReducer')
      .subscribe((state) => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm): void {
    const { name, amount } = form.value;
    const newIngredient = new IngredientModel(name, amount);
    if (this.editMode) {
      this.store.dispatch(new SlActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new SlActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.store.dispatch(new SlActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new SlActions.StopEditIngredient());
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
    this.store.dispatch(new SlActions.StopEditIngredient());
  }
}
