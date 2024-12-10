import { Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';

import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  standalone: true,
  selector: 'app-knowledge-page',

  imports: [NzTypographyModule, NzListModule],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.css',
})
export class KnowledgePageComponent {
  sanitation: string[] = ['string1', 'string2', 'string3'];
  conservation: string[] = ['string1', 'string2', 'string3'];
}
