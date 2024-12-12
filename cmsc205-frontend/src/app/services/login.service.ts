import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { UserService } from './user.service';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_URL = environment.API_URL;
  us = inject(UserService);
  router = inject(Router);
  http = inject(HttpClient);
  constructor() {}

  postLogin(email: string, password: string) {
    const base64Creds = btoa(`${email}:${password}`);
    this.http
      .post<any>(this.API_URL + 'login', null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Creds}`,
        },
      })
      .subscribe((res) => {
        if (res.status === 200) {
          const userObj: User = {
            email: res.user.Email,
            firstname: res.user.FirstName,
            lastname: res.user.LastName,
            picture: res.user.Picture,
          };
          this.us.updateUser(userObj);
          this.router.navigate(['']);
          // must return firstname, lastname and session jwt
        }
      });
  }
}
