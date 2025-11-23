import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './front/components/menu/menu';
import { AdminMenu } from './back/components/admin-menu/admin-menu';

@Component({
  selector: 'app-root',
  imports: [Menu,RouterOutlet,AdminMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mini_prj_angular');
userRole: string | null=null;
onRole() {
  if (typeof localStorage !='undefined') {
    this.userRole = localStorage.getItem('role'); 
  }
  return true;
}
}
