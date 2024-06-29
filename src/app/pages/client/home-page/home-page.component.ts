import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { ProductService } from '../../../service/product.service';
import { BannerComponent } from '../../../components/layouts/banner/banner.component';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BannerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  products: IProduct[] | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  addToCart(id: any) {
    if (id) {
      this.cartService.addItem(id, 1).subscribe(() => {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        if (confirm('Bạn có muốn thanh toán luôn không!')) {
          this.router.navigate(['/cart']);
        }
      });
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
