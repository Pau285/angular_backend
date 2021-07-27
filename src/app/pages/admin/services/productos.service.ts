import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Categorias} from '../../../../../angular_backend/src/entity/categorias';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  //obtener productos

  getProductos(){
    return this.http.get<Object[]>(`${environment.API_URL}/productos/`);
  }

  getProductosCategoriesNull(){
    return this.http.get<Object[]>(`${environment.API_URL}/productos/listNull`);
  }

  // obtener un Producto

  getUnProducto(id:number){
    return this.http.get(`${environment.API_URL}/productos/${id}`);
  }

  // agregar Producto

  addProducto(producto: JSON){
  return this.http.post(`${environment.API_URL}/productos`, producto);
  }

  // eliminar Producto

  deleteProducto(id:number){
    return this.http.delete(`${environment.API_URL}/productos/${id}`);
  }

  //editar Producto

  editProducto(id:number, equipo:Producto){
    return this.http.put(`${environment.API_URL}/productos/${id}`, equipo);
  }

  assignCategory(id: number, category: JSON){
    return this.http.put(`${environment.API_URL}/productos/${id}/assignCategory`, category);
  }

  getAllProductsWithCategory(){
    return this.http.get<Producto[]>(`${environment.API_URL}/productos/lbycategory`);
  }

  getCategory(id: number){
    return this.http.get<Categorias>(`${environment.API_URL}/productos/${id}/lbycategory`);
  }

  activateProducto(id: number) {
    return this.http.put(`${environment.API_URL}/productos/${id}/activate`, Object);
  }
}

export interface Producto{
  id_producto:number,
  nombre:string,
  marca:string,
  descripcion:string,
  stock:number,
  categoria: Categorias
}
