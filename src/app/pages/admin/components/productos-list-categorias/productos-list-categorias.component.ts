import { Component, OnInit } from '@angular/core';
import {Categorias} from '../../../../../../angular_backend/src/entity/categorias';
import {CategoriasService} from '@admin/categorias/components/categorias-list/services/categorias.service';
import {ProductosService} from '@admin/admin/services/productos.service';
import {Productos} from '../../../../../../angular_backend/src/entity/Productos';

@Component({
  selector: 'app-productos-list-categorias',
  templateUrl: './productos-list-categorias.component.html',
  styleUrls: ['./productos-list-categorias.component.scss']
})
export class ProductosListCategoriasComponent implements OnInit {
  listarProducto: Object[];
  listarCategorias: Categorias[];
  categoria: number;
  constructor(private categoriasService: CategoriasService, private productosService: ProductosService) { }

  ngOnInit(): void {
    this.categoriasService.getCategoriasActivadas().subscribe(data => {
      if (!!data) {
        this.listarCategorias = data;
      }
    }, error => {
      console.log(`getCategoriasActivadas: ${error}`);
    });
  }

  listByCategories(data) {
      this.categoriasService.getAllProducts(data).subscribe(data => {
        if (!!data) {
          this.listarProducto = data;
          this.ngOnInit();
        }
      }, error => {
        console.log(`getAllProducts: ${error}`);
      });
  }

}
