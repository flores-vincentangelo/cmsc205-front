import { inject, Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  ss = inject(SessionService);
  router = inject(Router);
  constructor() {}

  postLogin(username: string, password: string) {
    console.log(username, password);
    // this.http.post<any>(url, body, options: {headers})
    // must return firstname, lastname and session jwt

    this.ss.updateFirstName('Vincent Angelo');
    this.ss.updateLastname('Flores');
    this.router.navigate(['']);
  }
}
