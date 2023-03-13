import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import { ShareModule } from '../../share/share.module';
import { SlRoutingsModule } from './sl-routings.module';
import { SlEditComponent } from '../sl-edit/sl-edit.component';
import { SlListComponent } from '../sl-list/sl-list.component';

@NgModule({
  declarations: [SlListComponent, SlEditComponent],
  imports: [SlRoutingsModule, ShareModule, MatGridListModule, MatDividerModule],
})
export class SlModule {}
