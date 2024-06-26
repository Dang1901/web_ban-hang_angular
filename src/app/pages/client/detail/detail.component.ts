import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
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
