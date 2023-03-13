import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlListComponent } from './../sl-list/sl-list.component';

const slRoutes: Routes = [
  {
    path: '',
    component: SlListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(slRoutes)],
  exports: [RouterModule],
})
export class SlRoutingsModule {}
