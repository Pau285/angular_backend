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
  listarProducto: Producto[];
  selProAvailable: Producto[];
  categoria: Categorias;
  categoriaSeleccionada: Categorias;

  listaCategorias: Categorias[];

  constructor(private ProductosService: ProductosService, private categoriasService: CategoriasService) {
  }

  ngOnInit(): void {

    this.ProductosService.getProductos().subscribe(res => (this.listarProducto = <any> res));
    this.categoriasService.getCategoriasActivadas().subscribe(data => (this.listaCategorias = data));
  }


  impt() {
    this.categoriasService.assignProductos(this.categoriaSeleccionada.idDetalleProductos,
      JSON.parse(JSON.stringify(this.selProAvailable))).subscribe();
    this.asignarCategoria();
    Swal.fire({
      title: "Excelente!",
      text: "Asignación de categoria exitosa!",
      icon: "success"
    }).then(function (){
      //window.location.href= "/admin/asignarcategoria";
    });
    console.log(JSON.parse(JSON.stringify(this.listarProducto)));
  }

  asignarCategoria() {

    for (let i = 0; i < this.selProAvailable.length; i++) {
      this.ProductosService.assignCategory(this.selProAvailable[i].id,
        JSON.parse(JSON.stringify(this.categoriaSeleccionada))).subscribe();
    }
  }

}
