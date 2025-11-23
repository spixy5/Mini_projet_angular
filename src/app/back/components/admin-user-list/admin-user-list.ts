import { Component, inject, OnInit } from '@angular/core';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
import { AdminUserItem } from '../admin-user-item/admin-user-item';
@Component({
  selector: 'app-admin-user-list',
  imports: [AdminUserItem],
  templateUrl: './admin-user-list.html',
  styleUrl: './admin-user-list.css',
})
export class AdminUsers implements OnInit{
  private serviceUser:ServiceUser=inject(ServiceUser);
  users:User[]=[];
  ngOnInit(): void {
    this.serviceUser.getAllUsers().subscribe(
      data=>{
        if(data.success){
          this.users=data.users;
          this.users=this.users.filter(u => u.role!='admin');

        }
        else{
          console.log('error :'+data.message)
        }

      }
    )
  }
  onUserSuspended(userId: number) {
  const user = this.users.find(u => u.id==userId);
    if(user) 
      user.suspension++; 
  console.log('User suspended:', userId);
}

onUserBanned(userId: number) {
  const user=this.users.find(u => u.id==userId);
  if (user) 
    user.banned = 1;
  console.log('User banned:', userId);
}
userLength(): number {
  return this.users.length;
}

}
