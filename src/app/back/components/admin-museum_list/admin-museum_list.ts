import { Component, inject, OnInit } from '@angular/core';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminMuseumItem } from '../admin-museum-item/admin-museum-item';

@Component({
  selector: 'app-admin-museum-list',
  imports: [FormsModule,RouterLink,AdminMuseumItem],
  templateUrl: './admin-museum_list.html',
  styleUrl: './admin-museum_list.css',
})
export class AdminMuseumList implements OnInit{
private museumService:ServiceMuseum = inject(ServiceMuseum);
  constMuseum:Museum[]=[];
  museums: Museum[]=[];
  searchTerm: string = '';
  ngOnInit(): void {
    this.museumService.getAllMuseums().subscribe(
       data => {
         console.log(data)
        this.museums = data
        this.constMuseum=data
       }
      );
  }

  filterByName(){
  if (this.searchTerm) {
    this.museums = this.constMuseum.filter(museum =>museum.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    this.museums = this.constMuseum;
  }
}

museumsLength(): number {
  return this.museums.length;
}
onMuseumDeleted(museumId: number) {
  this.museums = this.museums.filter(m => m.id !=museumId);
}
}
