import {Component, Input, OnInit} from '@angular/core';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductosService} from '@admin/admin/services/productos.service';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss']
})
export class ModalQrComponent implements OnInit {
  @Input() data;
  elementType = NgxQrcodeElementTypes.URL;
  value: string;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  constructor(private modalService: NgbModal,
              private productosService: ProductosService) { }


  ngOnInit(): void {
  }

  openModal(content: any) {
    this.setQR();
    this.modalService.open(content, {centered: true, windowClass: 'modal-holder'});
  }

  setQR() {
      this.value = `  Nombre: ${this.data.nombre}
  Descripción: ${this.data.descripcion}
  Marca: ${this.data.marca}
  Stock: ${this.data.stock}`;
  }
}
