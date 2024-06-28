import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/Product';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: IProduct[] = [];
  totalItems: number = 0;
  subtotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.updateCartSummary();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  updateCartSummary(): void {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.updateCartSummary();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.updateCartSummary();
    }
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateCartSummary();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.updateCartSummary();
  }
}