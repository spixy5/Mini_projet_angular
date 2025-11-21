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
  readonly museumService :ServiceMuseum = inject(ServiceMuseum);
  allMuseums:Museum[]=[];
  museums: Museum[]=[];
  selectedCategory: string = 'Tous';
  searchTerm: string = '';
  ngOnInit(): void {
    this.museumService.getAllMuseums().subscribe(
       data => {
         console.log(data)
        this.museums = data
        this.allMuseums=data
       }
      );
  }
  applyFilters() {
  this.museums=this.allMuseums.filter(museum => {
    const category=this.selectedCategory=='Tous' || museum.category==this.selectedCategory;
    const name=!this.searchTerm || museum.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    return category && name;
  });
}

 filterByCategory(category: string) {
  this.selectedCategory=category;
  this.applyFilters();
}
filterByName() {
  this.applyFilters();
}

}
