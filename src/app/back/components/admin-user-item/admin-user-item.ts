import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-user-item',
  imports: [RouterLink],
  templateUrl: './admin-user-item.html',
  styleUrl: './admin-user-item.css',
})
export class AdminUserItem {
  private serviceUser:ServiceUser=inject(ServiceUser);
  @Input() user!:User;
  @Output() suspended=new EventEmitter<number>(); 
  @Output() banned=new EventEmitter<number>(); 
    suspendUser(id:number){
    this.serviceUser.suspendUser(id).subscribe(
      data=>{
        if(data.success){
          console.log(data);
           this.suspended.emit(id);
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
         this.banned.emit(id); 
        }
        else{
          console.log('error:' +data.message)
        }
      }
    )

  }

}
