import { Routes } from '@angular/router';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { CreateComponent } from './view/create/create.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { DetailComponent } from './pages/client/detail/detail.component';
import { SearchComponent } from './pages/client/search/search.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { ProductComponent } from './view/admin/product/product.component';
import { ActionProductComponent } from './view/admin/product/action-product/action-product.component';
import { DashboardComponent } from './view/admin/dashboard/dashboard.component';

export const routes: Routes = [
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
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];
