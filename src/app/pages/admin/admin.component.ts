import { Component, OnInit } from '@angular/core';
import {ProductosService, Producto
} from '../agregar/productos.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // variable
  listarProducto: Producto[];
  constructor(private ProductosService:ProductosService) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.ProductosService.getProductos().subscribe(
      res=>{
        console.log(res);
        this.listarProducto=<any>res;
      },
      err =>console.log(err)
    );
  }

}
