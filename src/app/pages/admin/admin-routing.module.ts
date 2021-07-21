import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import {CategoriaAssignComponent} from './components/categoria-assign/categoria-assign.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'asignarcategoria', component: CategoriaAssignComponent},
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
