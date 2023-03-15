import { Component, Input } from '@angular/core';

import { RecipeModel } from './../../../../contracts/models/recipe-model';

@Component({
  selector: 'a15ngrxstore-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() recipe!: RecipeModel;
  @Input() index!: number;
}
