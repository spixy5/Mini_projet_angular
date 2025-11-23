import { Component, inject } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
})
export class AdminMenu{
userId: string | null=null;
userRole: string | null=null;
private router:Router=inject(Router)
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
