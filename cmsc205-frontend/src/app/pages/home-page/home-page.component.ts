import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NgStyle,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  isCollapsed = true;
  nzThemeVal: string = 'outline';

  svgSideLength = '29px';
  svgStrokeColor = '#023047';

  setLogoStyling() {
    return {
      'justify-content': this.isCollapsed ? 'center' : 'start',
      'padding-left': this.isCollapsed ? 0 : '24px',
    };
  }
}
