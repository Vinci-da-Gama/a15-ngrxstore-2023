import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AlertModalComponent } from './shareComponents/alert-modal/alert-modal.component';
import { AlertPlaceholderDirective } from '../../directive/alert-placeholder/alert-placeholder.directive';

@NgModule({
  declarations: [AlertModalComponent, AlertPlaceholderDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [
    AlertModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  entryComponents: [AlertModalComponent],
})
export class ShareModule {}
