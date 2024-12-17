import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_URL = environment.API_URL;
  us = inject(UserService);
  router = inject(Router);
  http = inject(HttpClient);
  constructor() {}

  postLogin(email: string, password: string): Observable<any> {
    const base64Creds = btoa(`${email}:${password}`);
    return this.http.post<any>(this.API_URL + 'login', null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Creds}`,
      },
    });
  }
}
