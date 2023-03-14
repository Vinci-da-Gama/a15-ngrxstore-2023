import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../receipe-compos/layout/layout.component';
import { DetailsComponent } from '../receipe-compos/details/details.component';
import { EditComponent } from '../receipe-compos/edit/edit.component';
import { StartComponent } from '../receipe-compos/start/start.component';
import { AuthGuard } from './../../../services/guards/auth.guard';
import { RecipesResolverService } from '../../../services/resolvers/recipes-resolver.service';

export const receipeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartComponent },
      { path: 'new', component: EditComponent },
      {
        path: ':id',
        component: DetailsComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: EditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(receipeRoutes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
