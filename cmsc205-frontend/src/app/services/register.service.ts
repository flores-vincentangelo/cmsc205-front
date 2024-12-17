import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private API_URL = environment.API_URL;
  http = inject(HttpClient);
  constructor() {}

  register(formValues: Object): Observable<any> {
    return this.http.post<any>(
      this.API_URL + 'register',
      { ...formValues },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
