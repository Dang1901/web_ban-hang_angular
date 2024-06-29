import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin, map, switchMap, tap } from 'rxjs';
import { ICart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';
  private base = 'http://localhost:3000/cart?_expand=product';
  private cartUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}
  

  getItems(): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.base);
  }

  addItem(productId: number, quantity: number): Observable<ICart> {
    return this.http.post<ICart>(this.baseUrl, { productId, quantity }).pipe(
      tap(() => this.cartUpdated.next()) // Phát sự kiện khi thêm sản phẩm vào giỏ hàng
    );
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.cartUpdated.next()) // Phát sự kiện khi thêm sản phẩm vào giỏ hàng
    );
  }

  updateCartItem(item: ICart): Observable<ICart> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put<ICart>(url, item);
  }

  getCartUpdated(): Observable<void> {
    return this.cartUpdated.asObservable();
  }
  clearCart(): Observable<void> {
  return this.getItems().pipe(
    switchMap((items) => {
      const deleteRequests = items.map(item => this.http.delete<void>(`${this.baseUrl}/${item.id}`));
      return forkJoin(deleteRequests).pipe(
        tap(() => {
          this.cartUpdated.next();
          this.cartUpdated.complete();
        }),
        map(() => void 0) // Chuyển đổi kết quả thành `void`
      );
    })
  );
}

}
