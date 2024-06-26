import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  products: IProduct[] | undefined;
  constructor(private productService: ProductService){}
  ngOnInit() {
    this.productService.getProducts().subscribe((products) =>{
      this.products = products;
    });
  }
}
