import { Routes } from '@angular/router';
import { DashboardComponent } from './view/admin/dashboard/dashboard.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { CreateComponent } from './view/create/create.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { ProductComponent } from './view/admin/product/product.component';
import { ActionProductComponent } from './view/admin/product/action-product/action-product.component';

export const routes: Routes = [
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
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'action-product',
        component: ActionProductComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];
