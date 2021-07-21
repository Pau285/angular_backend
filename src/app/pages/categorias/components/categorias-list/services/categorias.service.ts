import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@env/environment';
import {Categorias} from '../../../../../../../angular_backend/src/entity/categorias';
import {Producto} from '@admin/admin/services/productos.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) { }

  getCategoriasActivadas() {
    return this.http.get<Categorias[]>(`${environment.API_URL}/categorias/listActivated`);
  }

  getCategoriasDesactivadas(){
    return this.http.get(`${environment.API_URL}/categorias/listDeactivated`);
  }

  // obtener un Producto

  getUnaCategoria(id:number){
    return this.http.get(`${environment.API_URL}/categorias/${id}`);
  }

  // agregar Producto

  addCategoria(categoria: JSON){
    return this.http.post(`${environment.API_URL}/categorias`, categoria);
  }

  // eliminar Producto

  deleteCategoria(id:number){
    return this.http.put(`${environment.API_URL}/${id}/delete`, this.httpOptions);
  }

  //editar Producto

  editCategoria(id: number, equipo: Categorias){
    return this.http.put(`${environment.API_URL}/${id}/update`, equipo);
  }

  assignProductos(id:number, json:JSON){
    return this.http.put(`${environment.API_URL}/categorias/${id}/assignProducts`, json)
  }
}
export interface Categoria{
  idDetalleProductos:number,
  nombre:string,
  descripcion:string,
  productos: Producto[]
}
