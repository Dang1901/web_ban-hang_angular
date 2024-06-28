import { Routes } from '@angular/router';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';

import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';

import { ProductAddComponent } from './pages/admin/product/product-add/product-add.component';
import { ProductDetailComponent } from './pages/admin/product/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/admin/product/product-edit/product-edit.component';
import { LoginComponent } from './pages/client/auth/login/login.component';
import { RegisterComponent } from './pages/client/auth/register/register.component';
import { ListProductsComponent } from './pages/admin/product/list-products/list-products.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { DetailComponent } from './pages/client/detail/detail.component';
import { SearchComponent } from './pages/client/search/search.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { ProductComponent } from './view/admin/product/product.component';
import { ActionProductComponent } from './view/admin/product/action-product/action-product.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },

      {
        path: 'search',
        component: SearchComponent,
      },

      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'list_products',
        component: ListProductsComponent,
      },
      {
        path: 'add_product',
        component: ProductAddComponent,
      },
      {
        path: 'detail_product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'edit_product/:id',
        component: ProductEditComponent,
      },
      {
        path: 'edit_product/:id',
        component: ProductEditComponent,
      },
      {
        path: 'edit_product/:id',
        component: ProductEditComponent,
      },
      {
        path: 'edit_product/:id',
        component: ProductEditComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'action-product',
        component: ActionProductComponent,
      },
      {
        path: 'action-product/:id',
        component: ActionProductComponent,
      },
    ],
  },
];
