import { Component } from '@angular/core';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../layouts/header/header.component';
import { DashboardComponent } from '../../view/admin/dashboard/dashboard.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss',
  imports: [
    SidebarComponent,
    RouterModule,
    HeaderComponent,
    DashboardComponent,
  ],
})
export class LayoutAdminComponent {
  activeIndex: number = 0;
  ngOnInit(): void {}
  toggleActive(index: number) {
    this.activeIndex = index;
  }
}
