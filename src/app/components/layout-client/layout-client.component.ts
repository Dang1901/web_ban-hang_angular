import { FooterComponent } from './../layouts/footer/footer.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../layouts/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.css'
})
export class LayoutClientComponent {

}
