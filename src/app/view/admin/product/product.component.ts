import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IProduct } from '../../../interface/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  products: IProduct[] | undefined;
  constructor(private productService: ProductService, private router: Router) {}
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
  handleRouter() {
    this.router.navigate(['/admin/action-product']);
    console.log('sdfsdf');
  }
}
