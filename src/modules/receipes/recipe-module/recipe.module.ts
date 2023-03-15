import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ShareModule } from '../../share/share.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { LayoutComponent } from '../receipe-compos/layout/layout.component';
import { DetailsComponent } from '../receipe-compos/details/details.component';
import { EditComponent } from '../receipe-compos/edit/edit.component';
import { ListComponent } from '../receipe-compos/list/list.component';
import { StartComponent } from '../receipe-compos/start/start.component';
import { ItemComponent } from '../receipe-compos/item/item.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DetailsComponent,
    EditComponent,
    ListComponent,
    StartComponent,
    ItemComponent,
  ],
  imports: [
    ShareModule,
    MatGridListModule,
    MatFormFieldModule,
    RecipeRoutingModule,
  ],
})
export class RecipeModule {}
