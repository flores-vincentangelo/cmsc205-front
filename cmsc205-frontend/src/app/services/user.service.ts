import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AppCookieService } from './app-cookie.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: BehaviorSubject<User>;
  firstname$ = new BehaviorSubject<string>('');
  lastname$ = new BehaviorSubject<string>('');
  cs = inject(AppCookieService);

  constructor() {}

  getFullname(): Observable<[string, string]> {
    return combineLatest(this.firstname$, this.lastname$);
  }

  getFirstname(): Observable<string> {
    return this.firstname$;
  }

  getLastname(): Observable<string> {
    return this.lastname$;
  }

  updateFirstName(firstname: string): void {
    this.cs.getCookie('user');
    this.firstname$.next(firstname);
  }

  updateLastname(lastname: string): void {
    this.lastname$.next(lastname);
  }

  updateUser(): void {
    const user = <User>this.cs.getCookie('user');
    this.user$.next(user);
  }

  getUser$(): Observable<User> {
    return this.user$;
  }
}
