import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductosService} from '@admin/admin/services/productos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.scss']
})
export class ProductosAddComponent implements OnInit {

  postProductForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  constructor(private productoServices: ProductosService, private modalService: NgbModal, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.postProductForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      marcaProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],
      stockProducto: ['', Validators.required]
    });
  }

  openModal(content: any) {
    this.modalService.open(content, {centered: true, windowClass: 'modal-holder'});
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postProductForm.invalid) {
      return;
    }else {
      const data = {
        nombre: this.postProductForm.controls['nombreProducto'].value,
        marca: this.postProductForm.controls['marcaProducto'].value,
        descripcion: this.postProductForm.controls['descripcionProducto'].value,
        stock: this.postProductForm.controls['stockProducto'].value
      };
      console.log(data);
      this.productoServices.addProducto(JSON.parse(JSON.stringify(data))).subscribe();
      this.modalService.dismissAll();
      Swal.fire({
        title: "Excelente!",
        text: "Producto agregado satisfactoriamente!",
        icon: "success"
      }).then(function (){
        window.location.href= "/admin";
      });
    }
  }

  get f() {
    return this.postProductForm.controls;
  }


}
