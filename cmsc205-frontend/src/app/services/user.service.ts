import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AppCookieService } from './app-cookie.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    firstname: 'null',
    lastname: 'null',
    email: 'null',
  });

  user!: User;
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

  updateUser(user: User): void {
    this.user$.next(user);
    this.cs.setCookie('user', user);
  }

  getUser(): User {
    this.user$.subscribe((user: User) => {
      if (user.firstname === 'null') {
        this.user$.next(<User>this.cs.getCookie('user'));
      } else {
        this.user = user;
      }
    });
    return this.user;
  }
}
