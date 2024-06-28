import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  isUpdate: boolean = false;
  productId: string = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.createProductForm();
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
        this.productId = id;
        this.isUpdate = true;
      });
    }
  }
  createProductForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      discount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('^[0-9]*$'),
          this.discountValidator.bind(this),
        ],
      ],
      image: ['', [Validators.required]],
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      desc: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  discountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const price = this.productForm.get('price')?.value;
      const discount = control.value;
      if (price && discount > price) {
        return { discountExceedsPrice: true };
      }
      return {};
    };
  }
  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    console.log(control);
    if (control?.errors?.['required']) {
      return 'Bắt buộc phải nhập';
    } else if (control?.errors?.['minlength']) {
      return 'Bắt buộc phải nhập lớn hơn 3 ký tự';
    } else if (control?.errors?.['min']) {
      return 'Giá/Số lượng/Discount phải lớn hơn 0';
    } else if (control?.errors?.['discountExceedsPrice']) {
      return 'Discount không được lớn hơn giá';
    }
    return '';
  }
  getFileNameFromPath(filePath: string): string {
    return filePath.replace(/^.*[\\\/]/, '');
  }
  handleSubmit() {
    console.log(this.productForm);

    if (this.productForm.valid) {
      if (!this.isUpdate) {
        this.productService
          .createProduct(this.productForm.value)
          .subscribe((data: any) => {
            alert('Thêm thành công!');
            this.router.navigate(['/admin/product']);
          });
      } else {
        this.productService
          .updateProduct(this.productId, this.productForm.value)
          .subscribe((data: any) => {
            alert('Cập nhật thành công!');
            this.router.navigate(['/admin/product']);
          });
      }
    }
  }

  onImageSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.productForm.controls['image'].setValue(inputElement.files[0]);
      console.log(this.productForm.controls['image'].value);
    }
  }
}
