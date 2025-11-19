import { Component, inject } from '@angular/core';
import { Museum } from '../../../models/museum';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';
import { DatePipe } from '@angular/common';
import { MuseumComments } from '../museum-comments/museum-comments';

@Component({
  selector: 'app-museum-selected',
  imports: [DatePipe,MuseumComments],
  templateUrl: './museum-selected.html',
  styleUrl: './museum-selected.css',
})
export class MuseumSelected {
private route = inject(ActivatedRoute);
 private router: Router=inject(Router);
  private museumService = inject(ServiceMuseum);
  museumId?: number;
  museum!: Museum;
  ngOnInit(): void {
  this.museumId=Number(this.route.snapshot.paramMap.get('id'));
      this.museumService.getMuseumById(this.museumId).subscribe(
      data => {
        console.log(data)
        this.museum = data;
      
    });
  }
  onVisitClick() {
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
    const query = encodeURIComponent(`${name} ${location}`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }



}
