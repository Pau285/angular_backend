import { Component, OnInit } from '@angular/core';
import {ProductosService, Producto} from './services/productos.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // variable
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
}
