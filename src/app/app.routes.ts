import { Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { CreateComponent } from './view/create/create.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutClientComponent
    },
    {
        path: 'admin',
        component: LayoutAdminComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'create',
                component: CreateComponent
            }
        ]
    },
];
