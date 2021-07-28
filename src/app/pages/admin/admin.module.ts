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
import { ProductosListCategoriasComponent } from './components/productos-list-categorias/productos-list-categorias.component';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { ModalQrComponent } from './components/productos-list-categorias/components/modal-qr/modal-qr.component';

@NgModule({
  declarations: [AdminComponent, ModalComponent, ProductosAddComponent, ProductosUpdateComponent, CategoriaAssignComponent, ProductosListCategoriasComponent, ModalQrComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgxQRCodeModule,
    FormsModule,
  ],
})
export class AdminModule {}
