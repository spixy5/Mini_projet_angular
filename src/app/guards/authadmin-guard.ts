import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authadminGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router)
  const role=localStorage.getItem('role');
  if(role && role == 'admin')
    return true;
  router.navigate(['/admin'])
  return false;


};
