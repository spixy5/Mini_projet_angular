import { Component, inject, OnInit } from '@angular/core';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-museums',
  imports: [FormsModule,RouterLink],
  templateUrl: './admin-museums.html',
  styleUrl: './admin-museums.css',
})
export class AdminMuseums implements OnInit{
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
deleteMuseum(museumId :number){
     this.museumService.deleteMuseum(museumId).subscribe(
       data => {
         if(data.success){
          console.log(data)
          this.museums=this.constMuseum.filter(museum => museum.id!=museumId)
          this.constMuseum=this.museums;
         }
         else{
          console.log('error',data.message)
         }
       }
      );

}
museumsLength(): number {
  return this.museums.length;
}
}
