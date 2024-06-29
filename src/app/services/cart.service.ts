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

  addItem(productId: number, quantity: number): Observable<ICart> {
    return this.http.post<ICart>(this.baseUrl, { productId, quantity });
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateCartItem(item: ICart): Observable<ICart> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put<ICart>(url, item);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
