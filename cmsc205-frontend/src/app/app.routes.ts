import { Routes } from '@angular/router';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { KnowledgePageComponent } from './pages/knowledge-page/knowledge-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: MapPageComponent, title: 'Map'},
  { path: 'knowledge', component: KnowledgePageComponent, title: 'Knowledge'},
  { path: 'profile', component: ProfilePageComponent, title: 'Profile'},
];
