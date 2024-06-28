import { Component } from '@angular/core';
import { IProduct } from '../../../../interfaces/Product';
import { ProductService } from '../../../../service/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  products: IProduct[] | undefined;
  constructor(private productService: ProductService){}
  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  ngOnInit() {
    this.loadProducts();
  }

  handleDelete(id: string | number | undefined) {
    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log('Product deleted successfully!');
        alert('Xóa thành công!');
        this.loadProducts(); // Reload the products after deletion
      });
    }
  }
}
