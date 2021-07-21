import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriasListComponent} from './components/categorias-list/categorias-list.component';

const routes: Routes = [
  {path: '', component: CategoriasListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
