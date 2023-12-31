import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';
  pdf = 'http://localhost:4000/api/generate-pdf/';

  constructor(private http: HttpClient) { 

  }
  
  getPDF(): Observable<any> {
    return this.http.get(this.pdf, { responseType: 'blob' })
  }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  viewProducto(id?: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

  

  uploadFile(formData: any){
    let urlApi = 'http://localhost:4000/api/subir';
    return this.http.post(urlApi, formData);
  }

 
  cargarProductoConImagen(producto: FormData): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}`, producto);
  }

}
