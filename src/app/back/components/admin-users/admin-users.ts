import { Component, inject, OnInit } from '@angular/core';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-users',
  imports: [RouterLink],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
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
  suspendUser(id:number){
    this.serviceUser.suspendUser(id).subscribe(
      data=>{
        if(data.success){
          console.log(data);
           if(data.ban==1){
 
           }
        }
        else{
          console.log('error:' +data.message)
        }
      }
    )

  }
  banUser(id:number){
        this.serviceUser.banUser(id).subscribe(
      data=>{
        if(data.success){
          console.log(data)
        }
        else{
          console.log('error:' +data.message)
        }
      }
    )

  }
userLength(): number {
  return this.users.length;
}

}
