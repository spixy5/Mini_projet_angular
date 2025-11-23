import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authuserGuard: CanActivateFn = (route, state) => {
   const router:Router=inject(Router)
  const role=localStorage.getItem('role');
  if(role && role=='user')
    return true;
  router.navigate(['/login'])
  return false;
};
