import { Component, inject, OnInit } from '@angular/core';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Ticket } from '../../../models/ticket';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
@Component({
  selector: 'app-admin-statistics',
  imports: [DatePipe],
  templateUrl: './admin-statistics.html',
  styleUrl: './admin-statistics.css',
})
  export class AdminStatistics implements OnInit{
      private museumService :ServiceMuseum = inject(ServiceMuseum);
      private userService :ServiceUser = inject(ServiceUser);
    museums: Museum[]=[];
    users: User[]=[];
  ngOnInit(): void {
      this.museumService.getAllMuseums().subscribe(
        data => {
          console.log(data)
          this.museums = data
           this.museums.forEach(museum => 
                {
                  if(museum.id){
                     this.museumService.getAllComments(museum.id).subscribe(
                    data => {
                      if (data.success) {
                    museum.comments=data.comments;
                } else {
                  console.error('Failed to load comments');
              
                }
                },
            
              );
                  }
            }
           );
              this.museums.forEach(museum => 
                {
                  if(museum.id){
                     this.museumService.getAllTickets().subscribe(
                    data => {
                      if (data.success) {
                        museum.tickets=(data.tickets as Ticket[]).filter(t => t.museum_id==museum.id)
                } else {
                  console.error('Failed to load comments');
              
                }
                },
            
              );
                  }
            }
           );
       
        }
        );
        this.userService.getAllUsers().subscribe(
          data=>{
            if(data.success){
              this.users=data.users;
              this.users=this.users.filter(u => u.role!='admin')
            }
            else{
              alert('error :'+data.message)
            }
          }
        )
    
  }


calculatePerformance(museum: Museum): number {
  const visits= Number(museum.visits) || 0;
  const tickets=Number(museum.tickets) || 0;
  if (visits==0) return 0;
  const percentage=(tickets / visits) * 200 - 100;
  return Math.round(percentage);
}
isActive(lastLogin?: Date): boolean {
  if (!lastLogin) return false;
  const today = new Date();
  const last = new Date(lastLogin);
  const diffMonths = (today.getFullYear()-last.getFullYear()) * 12 + (today.getMonth()-last.getMonth());
  return diffMonths < 1;
}





  }
