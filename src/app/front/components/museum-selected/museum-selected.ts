import { Component, inject, OnInit } from '@angular/core';
import { Museum } from '../../../models/museum';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';
import { DatePipe } from '@angular/common';
import { MuseumComments } from '../museum-comments/museum-comments';
import { ServiceUser } from '../../../services/service-user';
@Component({
  selector: 'app-museum-selected',
  imports: [DatePipe,MuseumComments,RouterLink],
  templateUrl: './museum-selected.html',
  styleUrl: './museum-selected.css',
})
export class MuseumSelected implements OnInit{
readonly route:ActivatedRoute = inject(ActivatedRoute);
readonly router: Router=inject(Router);
readonly museumService:ServiceMuseum = inject(ServiceMuseum);
readonly userService:ServiceUser=inject(ServiceUser)
  museumId?: number;
  museum!: Museum;
  userRole=localStorage.getItem('role');
  weather:any;
  ngOnInit(): void {
  this.museumId=Number(this.route.snapshot.paramMap.get('id'));
     if(this.museumId){
        this.museumService.updateMuseumVisits(this.museumId).subscribe();
       this.museumService.getMuseumById(this.museumId).subscribe(
      data => {
        this.museum=data;
        if(this.museum.id){
          this.museumService.getAllComments(this.museum.id).subscribe(
          data => {
         if (data.success) {
           this.museum.comments=data.comments;
      } else {
        console.error('Failed to load comments');
    
      }
      },
   
    );
        }
        const userId=Number(localStorage.getItem('userId'));
        if(userId){
        this.userService.updateActivity(userId).subscribe(
        data=>console.log(data)
      )
      }
      this.museumService.getWeather(this.museum.location).subscribe(
           data => {
            this.weather = data;
            console.log('Weather:', data);
          },
       );
    });
     }


    

  }
 
  onBuyTicketClick() {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      if(this.museum.is_open==1)
      this.router.navigate(['museum',this.museumId,'pay-ticket']);
    else{
      alert("Le musée est fermé.");
    }
    } else {
      this.router.navigate(['/login']);
    }
  }
  onItineraryClick(name: string | undefined, location: string | undefined) {
   if(location && name){
     const query = encodeURIComponent(`${name} ${location}`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
   }
  }



}
