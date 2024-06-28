import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service'; 
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  productId: string | number | undefined;
  product: IProduct | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.productService.getProductById(this.productId).subscribe((p) => {
      this.product = p;
    });
  }
  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Điều hướng đến trang giỏ hàng sau khi thêm sản phẩm vào giỏ hàng
      this.router.navigate(['/cart']);
    }
  }
}
