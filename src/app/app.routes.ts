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
    ],
  },
];
