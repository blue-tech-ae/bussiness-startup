import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // نستدعي Router بالطريقة الجديدة
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // أو حسب الطريقة اللي تخزن فيها

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/auth']); // يحوله لصفحة تسجيل الدخول
    return false;
  }
};
