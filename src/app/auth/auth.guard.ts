import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@app/auth/auth.service';

export const authGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['login']);

  return false;
};
