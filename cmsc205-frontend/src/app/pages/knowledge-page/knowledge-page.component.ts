import { Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';

import { KnowledgeSource } from '../../models/knowledge-source';

import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  standalone: true,
  selector: 'app-knowledge-page',

  imports: [NzTypographyModule, NzListModule],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.css',
})
export class KnowledgePageComponent {
  sanitation: KnowledgeSource[] = [
    {
      title: 'World Health Organization Water, sanitation and hygiene (WASH)',
      link: 'https://www.who.int/health-topics/water-sanitation-and-hygiene-wash#tab=tab_1',
    },
    {
      title: "UNICEF 10 things you didn't know about water",
      link: 'https://www.unicef.org/stories/10-things-you-didnt-know-about-water?gad_source=1&gclid=EAIaIQobChMIg7rz8--higMVclUPAh1gdy-HEAAYASAAEgLt2vD_BwE',
    },
    {
      title: 'World Health Organization Drinking water quality guidelines',
      link: 'https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/water-safety-and-quality/drinking-water-quality-guidelines',
    },
  ];
  conservation: KnowledgeSource[] = [
    {
      title:
        "DENR-WRMO releases water conservation guidelines for gov't offices",
      link: 'https://denr.gov.ph/news-events/denr-wrmo-releases-water-conservation-guidelines-for-govt-offices/',
    },
    {
      title: 'MWSS Water Conservation Tips',
      link: 'https://ro.mwss.gov.ph/water-conservation-tips/',
    },
    {
      title: 'Policy Guidelines on Water Conservation Measures',
      link: 'https://www.dpwh.gov.ph/dpwh/issuances/department-order/2432',
    },
  ];
}
