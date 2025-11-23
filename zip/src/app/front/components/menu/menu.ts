import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
userId: string | null=null;
userRole: string | null=null;
private router:Router=inject(Router);
onRole(): boolean {
  if (typeof localStorage !='undefined') {
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('role'); 
    return !!this.userId; 
  }
  return false; 
}
OnlogOut(){
  localStorage.clear();
  this.router.navigate(['/home'])
}

}
