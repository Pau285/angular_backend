import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
import { ProductosAddComponent } from './components/productos-add/productos-add.component';
import { ProductosUpdateComponent } from './components/productos-update/productos-update.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { CategoriaAssignComponent } from './components/categoria-assign/categoria-assign.component';

@NgModule({
  declarations: [AdminComponent, ModalComponent, ProductosAddComponent, ProductosUpdateComponent, CategoriaAssignComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbAlertModule,
    FormsModule,
  ],
})
export class AdminModule {}
