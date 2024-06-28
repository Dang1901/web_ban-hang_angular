import { Component } from '@angular/core';
import { IProduct } from '../../../../interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productId: string | number | undefined;
  product: IProduct | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ){}
  ngOnInit(): void {
      this.productId = this.route.snapshot.params['id'];
      console.log(this.productId);
      this.productService.getProductById(this.productId).subscribe((p)=>{
        this.product = p;
      });
      
  }
}
