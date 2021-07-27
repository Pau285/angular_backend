import {Component, OnInit} from '@angular/core';
import {Producto, ProductosService} from '@admin/admin/services/productos.service';
import {CategoriasService} from '@admin/categorias/components/categorias-list/services/categorias.service';
import {Categorias} from '../../../../../../angular_backend/src/entity/categorias';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-assign',
  templateUrl: './categoria-assign.component.html',
  styleUrls: ['./categoria-assign.component.scss']
})
export class CategoriaAssignComponent implements OnInit {
  listarNoAsignado: Object[];
  productoSeleccionado: Object[];
  categoria: Categorias;
  categoriaSeleccionada: Categorias;

  listaCategorias: Categorias[];


  constructor(private ProductosService: ProductosService,
              private categoriasService: CategoriasService) {
  }

  ngOnInit(): void {
    this.ProductosService.getProductosCategoriesNull().subscribe( data => {this.listarNoAsignado = data});
    this.categoriasService.getCategoriasActivadas().subscribe(data => (this.listaCategorias = data));
  }


  impt() {
    this.categoriasService.assignProductos(this.categoriaSeleccionada.idDetalleProductos,
      JSON.parse(JSON.stringify(this.productoSeleccionado))).subscribe( data =>{

    }, error =>{

    });
    this.asignarCategoria();
    Swal.fire({
      title: "Excelente!",
      text: "Asignación de categoria exitosa!",
      icon: "success"
    }).then(function (){
      window.location.href= "/admin/asignarcategoria";
    });
  }

  asignarCategoria() {

    for (let i = 0; i < this.productoSeleccionado.length; i++) {
      this.ProductosService.assignCategory(this.productoSeleccionado[i].productos_id,
        JSON.parse(JSON.stringify(this.categoriaSeleccionada))).subscribe();
    }
  }

}
