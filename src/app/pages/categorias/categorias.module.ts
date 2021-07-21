import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasListComponent } from './components/categorias-list/categorias-list.component';
import { CategoriasAddComponent } from './components/categorias-list/components/categorias-add/categorias-add.component';


@NgModule({
  declarations: [CategoriasListComponent, CategoriasAddComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
