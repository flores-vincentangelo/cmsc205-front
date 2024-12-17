import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const ls = inject(LoginService);
  const router = inject(Router);

  if (!ls.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
