import { Component } from '@angular/core';
import { SidebarComponent } from "../layouts/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../layouts/header/header.component";
import { DashboardComponent } from "../../view/dashboard/dashboard.component";

@Component({
    selector: 'app-layout-admin',
    standalone: true,
    templateUrl: './layout-admin.component.html',
    styleUrl: './layout-admin.component.css',
    imports: [SidebarComponent, RouterModule, HeaderComponent, DashboardComponent]
})
export class LayoutAdminComponent {

}
