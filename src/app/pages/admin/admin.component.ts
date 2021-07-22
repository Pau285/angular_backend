import { Component, OnInit } from '@angular/core';
import {ProductosService, Producto} from './services/productos.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // variable
  ProductosDeshabilitados: Producto[];
  listarProducto: Producto[];

  constructor(private ProductosService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void{
    this.ProductosService.getProductos().subscribe(
      res => {
        console.log(res);
        this.listarProducto = (res as any);
      },
      err => console.log(err)
    );
  }


  openAssignCategory(): void {
    this.router.navigate(['/admin/asignarcategoria']);
  }
  confirmDelete(id) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'El producto se deshabilitara',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si, deshabilitalo!'
    }).then(result => {
      if (result.value) {
        this.ProductosService.deleteProducto(id).subscribe(data=>(this.ngOnInit()));
        Swal.fire('Deshabilitado!', 'Tu producto ha sido deshabilitada.', 'success');

      }
    });
  }

  confirmActivate(id) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'El producto se habilitara nuevamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si, habilitalo!'
    }).then(result => {
      if (result.value) {
        this.ProductosService.activateProducto(id).subscribe(data=>(
          this.ngOnInit()
        ));
        Swal.fire('Habilitado!', 'Tu producto ha sido habilitado.', 'success');

      }
    });
  }
}
