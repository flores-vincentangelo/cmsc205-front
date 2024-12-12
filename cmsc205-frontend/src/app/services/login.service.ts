import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', `Basic ${base64Creds}`);
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
            email: res.email,
            firstname: res.firstname,
            lastname: res.lastname,
            picture: 'DSC_0017.JPG',
          };

          this.us.updateUser(userObj);
          this.router.navigate(['']);
          // must return firstname, lastname and session jwt
        }
      });
  }
}
