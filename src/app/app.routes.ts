import { Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { CreateComponent } from './view/create/create.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { DetailComponent } from './pages/client/detail/detail.component';
import { SearchComponent } from './pages/client/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutClientComponent,
        children: [
            {
                path: '',
                component: HomePageComponent
            },
            {
                path: 'detail/:id',
                component: DetailComponent
            },
            
            {
                path: 'search',
                component: SearchComponent
            }
        ]
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
