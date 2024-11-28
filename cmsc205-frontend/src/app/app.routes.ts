import { Routes } from '@angular/router';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { KnowledgePageComponent } from './pages/knowledge-page/knowledge-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: '', component: HomePageComponent, title: 'Home',
    children: [
      { path: 'map', component: MapPageComponent, title: 'Map'},
      { path: 'knowledge', component: KnowledgePageComponent, title: 'Knowledge'},
      { path: 'profile', component: ProfilePageComponent, title: 'Profile'},
    ]
  },
  {
    path: 'login', component: LoginPageComponent, title: 'Login'
  }

];

