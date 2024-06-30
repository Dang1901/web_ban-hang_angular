// src/app/components/detail/detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { RatingComponent } from '../component/rating/rating.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [CommonModule, RouterModule, RatingComponent],
})
export class DetailComponent implements OnInit {
  productId: number | undefined;
  product: IProduct | undefined;
  userInfo: any = {} as any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params['id']; // Ép kiểu sang number
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((p) => {
        this.product = p;
      });
    }
    this.userInfo = this.getUserInfoFromCookie();
  }
  getUserInfoFromCookie() {
    const userInfoString = this.cookieService.get('userInfo');
    if (userInfoString) {
      try {
        return JSON.parse(userInfoString);
      } catch (error) {
        console.error('Error parsing userInfo from cookie:', error);
        return null;
      }
    }
    return null;
  }
  addToCart(): void {
    if (this.productId && this.userInfo) {
      this.cartService.addItem(this.productId, 1).subscribe(() => {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        if (confirm('Bạn có muốn thanh toán luôn không!')) {
          this.router.navigate(['/cart']);
        }
      });
    }
    if (!this.userInfo) {
      alert('Bạn cần đăng nhập để mua hàng!');
      this.router.navigate(['/login']);
    }
  }
  formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const formattedAmount = formatter.format(amount);
    return formattedAmount.replace('.00', '');
  }
}
