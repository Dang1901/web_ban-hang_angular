// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart'; 
  private base = 'http://localhost:3000/cart?_expand=product';

  constructor(private http: HttpClient) {}

  getItems(): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.base);
  }

  addItem(product: number, quantity: number): Observable<ICart> {
    return this.http.post<ICart>(this.baseUrl, { product, quantity });
  }

  removeItem(product: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${product}`);
  }
}
