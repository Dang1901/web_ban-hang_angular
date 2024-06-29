import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchForm = new FormGroup({
    keywords : new FormControl('')
  });
  totalItems: number = 0;
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
 ngOnInit(): void {
    this.loadCartItems();
    this.cartService.getCartUpdated().subscribe(() => {
      this.loadCartItems();
    });
  }
  loadCartItems(): void {
    this.cartService.getItems().subscribe((items) => {
      this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }
  onSearch(){
    const keywords = this.searchForm.controls.keywords.value
      this.router.navigate(['search'],{
        queryParams: {keywords: keywords}
      })
  }

  cart(): void {
    this.router.navigate(['/cart']);
  }
}
