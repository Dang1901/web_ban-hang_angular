// src/app/components/detail/detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [CommonModule, RouterModule],
})
export class DetailComponent implements OnInit {
  productId: number | undefined;
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params['id']; // Ép kiểu sang number
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((p) => {
        this.product = p;
      });
    }
  }

  addToCart(): void {
    if (this.productId) {
      this.cartService.addItem(this.productId, 1).subscribe(() => {
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
