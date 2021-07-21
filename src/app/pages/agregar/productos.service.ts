import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  constructor(private http:HttpClient) { }

  //obtener productos

  getProductos(){
    return this.http.get(`${environment.API_URL}/productos`);
  }
  // obtener un Producto

  getUnProducto(id:number){
    return this.http.get(`${environment.API_URL}/productos`+'/'+id);
  }

  // agregar Producto 
 
  addProducto(producto:Producto){
  return this.http.post(`${environment.API_URL}/productos`, producto);
  }

  // eliminar Producto 

  deleteProducto(id:number){
    return this.http.delete(`${environment.API_URL}/productos`+'/'+id);
  }

  //editar Producto

  editProducto(id:number, equipo:Producto){
    return this.http.put(`${environment.API_URL}/productos`+'/'+id, equipo)
  }

}

export interface Producto{
  id_producto:number,
  nombre:string,
  marca:string,
  descripcion:string,
  stock:number;
}
