import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
import { DatePipe } from '@angular/common';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-admin-selected-user',
  imports: [DatePipe],
  templateUrl: './admin-selected-user.html',
  styleUrl: './admin-selected-user.css',
})
export class AdminSelectedUser implements OnInit{
  private route:ActivatedRoute = inject(ActivatedRoute);
  private userService:ServiceUser = inject(ServiceUser);
  userId!:number;
  user!:User;
  comments:Comment[]=[];
  ngOnInit(): void {
     this.userId=Number(this.route.snapshot.paramMap.get('id'));
     this.userService.getUserById(this.userId).subscribe(
      data=> {this.user=data.user
        this.userService.getAllComments(this.user.email).subscribe(
          data => {console.log(data)
            this.comments=data.comments
          }
        )

        
      }
     )
  }
getDaysSinceLastLogin(lastLogin?: Date): number {
  if (!lastLogin) return 0;
  const last=new Date(lastLogin);
  const now=new Date();
  const diffTime=Math.abs(now.getTime()-last.getTime());
  return Math.floor(diffTime/(1000 * 60 * 60 * 24)); 
}
}
