import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { ProductService } from '../../../service/product.service';
import { BannerComponent } from '../../../components/layouts/banner/banner.component';
import { CartService } from '../../../service/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [CommonModule, RouterModule, BannerComponent],
})
export class HomePageComponent implements OnInit {
  products: IProduct[] | undefined;
  userInfo: any = {} as any;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.userInfo = this.getUserInfoFromCookie();
  }
  addToCart(id: any) {
    if (this.userInfo) {
      if (id) {
        this.cartService.addItem(id, 1).subscribe(() => {
          alert('Sản phẩm đã được thêm vào giỏ hàng!');
          if (confirm('Bạn có muốn thanh toán luôn không!')) {
            this.router.navigate(['/cart']);
          }
        });
      }
      return;
    }
    if (!this.userInfo) {
      alert('Bạn cần đăng nhập để mua hàng!');
      this.router.navigate(['/login']);
    }
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
