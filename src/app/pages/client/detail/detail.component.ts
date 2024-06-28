// src/app/components/detail/detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { IProduct } from '../../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class DetailComponent implements OnInit {
  product: number | undefined;
  iProduct: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.product = +this.route.snapshot.params['id']; // Ép kiểu sang number
    if (this.product) {
      this.productService.getProductById(this.product).subscribe((p) => {
        this.iProduct = p;
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product, 1).subscribe(() => {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        this.router.navigate(['/cart']);
      });
    }
  }
}
