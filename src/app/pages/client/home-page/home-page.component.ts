import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  searchText: any;
  products: IProduct[] | undefined;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    console.log(this.formatCurrency(299999)); // Output: 299,999.00 VND
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
