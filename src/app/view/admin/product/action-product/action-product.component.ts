import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../interface/product';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-action-product',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './action-product.component.html',
  styleUrl: './action-product.component.css',
})
export class ActionProductComponent implements OnInit {
  product: IProduct = {} as IProduct;
  productForm: FormGroup = {} as FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      discount: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      image: ['', [Validators.required]],
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      desc: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {}

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.errors?.['required']) {
      return 'Bắt buộc phải nhập';
    } else if (control?.errors?.['minlength']) {
      return 'Bắt buộc phải nhập lớn hơn 3';
    } else if (control?.errors?.['min']) {
      return 'Giá phải lớn hơn 0';
    }
    return '';
  }
  handleSubmit() {
    console.log(this.productForm);

    if (this.productForm.valid) {
      this.productService
        .createProduct(this.productForm.value)
        .subscribe((data: any) => {
          console.log('Create product successfully!', data);
          alert('Thêm thành công!');
          this.router.navigate(['/admin/product']);
        });
    }
  }
}
