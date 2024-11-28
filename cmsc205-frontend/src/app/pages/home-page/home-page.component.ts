import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavComponent } from '../../nav/nav.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink, RouterOutlet, NavComponent, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  isCollapsed = false;
}
