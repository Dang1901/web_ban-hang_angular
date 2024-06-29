import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IUser } from '../../../interfaces/Auth';
import { UserService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  userInfo: IUser = {} as IUser;
  searchForm = new FormGroup({
    keywords: new FormControl(''),
  });
  totalItems: number = 0;
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loadCartItems();
    this.cartService.getCartUpdated().subscribe(() => {
      this.loadCartItems();
    });
    this.isLogin = localStorage.getItem('accessToken') ? true : false;
    this.userInfo = this.getUserInfoFromLocalStorage();
  }
  loadCartItems(): void {
    this.cartService.getItems().subscribe((items) => {
      this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }
  getUserInfoFromLocalStorage() {
    const userInfoString = localStorage.getItem('user-info');
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
    return null;
  }
  onSearch() {
    const keywords = this.searchForm.controls.keywords.value;
    this.router.navigate(['search'], {
      queryParams: { keywords: keywords },
    });
  }
  extractUsername(value: string) {
    const regex = /^(\w+)@/;
    const match = value.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
  logout() {
    this.userService.setCurrentUser(null);
    localStorage.clear(); // Xóa tất cả dữ liệu trong LocalStorage
    this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập
  }
  admin() {
    this.router.navigate(['/admin']);
  }

  cart(): void {
    this.router.navigate(['/cart']);
  }
}
