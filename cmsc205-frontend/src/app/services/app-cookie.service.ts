import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  cs = inject(CookieService);

  constructor() {}

  setCookie(key: string, value: string | object) {
    if (typeof value === 'string') {
      this.cs.set(key, value);
    } else {
      console.log(JSON.stringify(value));
      this.cs.set(key, JSON.stringify(value));
    }
  }

  getCookie(key: string): string | object {
    const value = this.cs.get(key);
    if (value.charAt(0) === '{') {
      return JSON.parse(value);
    } else {
      return value;
    }
  }

  deleteCookies(): void {
    this.cs.deleteAll();
  }
}
