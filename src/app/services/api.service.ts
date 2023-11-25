import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Products } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorId': '300'//TODO: get authorId from session
    }),
  };
  // Guardar producto seleccionado en un servicio
  private selectedProduct = new BehaviorSubject<Products | null>(null);
  currentProduct = this.selectedProduct.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(this.apiURL + '/ipf-msa-productosfinancieros/bp/products', this.httpOptions)
  }
  createProduct(product: Products): Observable<Products> {
    return this.httpClient
      .post<Products>(this.apiURL + '/ipf-msa-productosfinancieros/bp/products', JSON.stringify(product), this.httpOptions)
  }
  updateProduct(product: Products): Observable<Products> {
    return this.httpClient
      .put<Products>(this.apiURL + '/ipf-msa-productosfinancieros/bp/products', JSON.stringify(product), this.httpOptions)
  }
  // Api para eliminar un producto, existe un problema con el api, elimina el producto pero retorna status false y un mensaje de error
  deleteProduct(id: string): Observable<string> {
    return this.httpClient
      .delete<string>(this.apiURL + `/ipf-msa-productosfinancieros/bp/products?id=${id}`, this.httpOptions)
  }

  // Guardar producto seleccionado en un servicio
  productSelected(product: Products): void {
    this.selectedProduct.next(product);
  }

  //validar id de producto
  checkIdProduct(id: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.apiURL + `/ipf-msa-productosfinancieros/bp/products/verification?id=${id}`, this.httpOptions)
  }
}
