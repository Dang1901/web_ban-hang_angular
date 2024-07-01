import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { ProductService } from '../../../service/product.service';
import { BannerComponent } from '../../../components/layouts/banner/banner.component';
import { CartService } from '../../../service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { RatingComponent } from '../component/rating/rating.component';
import { ICart } from '../../../interfaces/Cart';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [CommonModule, RouterModule, BannerComponent, RatingComponent],
})
export class HomePageComponent implements OnInit {
  products: IProduct[] | undefined;
  userInfo: any = {} as any;
  carts: ICart[] = [];
  @Input() rate: number = 0;
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
    this.cartService.getItems().subscribe((item) => {
      this.carts = item;
    });
  }
  addToCart(id: any) {
    if (this.userInfo) {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = this.carts.find((item) => item.product.id === id);
      if (existingItem) {
        const quantity = +existingItem?.quantity + 1;
        // Nếu sản phẩm đã có, tăng số lượng lên 1
        this.cartService
          .updateCartQuantity(existingItem.id, quantity)
          .subscribe((updatedCart) => {
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            if (confirm('Bạn có muốn thanh toán luôn không?')) {
              this.router.navigate(['/cart']);
            }
          });
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        this.cartService.addItem(id, 1).subscribe(
          () => {
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            if (confirm('Bạn có muốn thanh toán luôn không?')) {
              this.router.navigate(['/cart']);
            }
          },
          (error) => {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
          }
        );
      }
    } else {
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

  get numStars(): number {
    return Math.floor(this.rate);
  }

  get stars(): any[] {
    return new Array(5);
  }
}
