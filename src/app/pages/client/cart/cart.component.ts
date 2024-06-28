// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ICart } from '../../../interfaces/Cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  items: ICart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  removeItem(product: number): void {
    this.cartService.removeItem(product).subscribe(() => {
      this.items = this.items.filter(item => item.product.id !== product);
    });
  }

  getTotalCost(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
