import { Component, inject, OnInit } from '@angular/core';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-museum-list',
  imports: [FormsModule,RouterLink],
  templateUrl: './museum-list.html',
  styleUrl: './museum-list.css',
})
export class MuseumList implements OnInit{
  private museumService = inject(ServiceMuseum);
  constMuseum:Museum[]=[];
  museums: Museum[]=[];
  selectedCategory: string = 'Tous';
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
    filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.searchTerm='';
    if(this.selectedCategory!='Tous'){
   this.museums=this.constMuseum.filter(museum => museum.category==this.selectedCategory 
  );
 }
 else{
  this.museums=this.constMuseum
 }
  }
  filterByName(): void {
  if (this.searchTerm) {
    this.selectedCategory='Tous';
    this.museums = this.constMuseum.filter(museum =>museum.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    this.museums = this.constMuseum;
  }
}

}
