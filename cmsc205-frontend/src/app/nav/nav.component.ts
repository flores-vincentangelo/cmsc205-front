import { Component } from '@angular/core';
import { LinksComponent } from './links/links.component';

@Component({
  selector: 'app-nav',
  imports: [LinksComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
