import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  return authService.currentUserRole.pipe(
    map(role => {
      const expectedRoles = route.data['roles'] as Array<string>;
      if (expectedRoles && expectedRoles.indexOf(role) === -1) {
        // Vai trò không hợp lệ, điều hướng về trang home
        toastr.error('Bạn không có quyền để vào trang này', 'Error');
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};
