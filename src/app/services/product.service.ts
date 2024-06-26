import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<IProduct[]>(this.baseUrl);
  }
  getProductById(id: string | number | undefined) {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }
  createProduct(product: IProduct) {
    return this.http.post(`${this.baseUrl}`, product);
  }
  updateProduct(id: string | number | undefined, product: IProduct) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }
  deleteProduct(id: string | number | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
