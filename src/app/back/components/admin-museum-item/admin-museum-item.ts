import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Museum } from '../../../models/museum';
import { RouterLink } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';

@Component({
  selector: 'app-admin-museum-item',
  imports: [RouterLink],
  templateUrl: './admin-museum-item.html',
  styleUrl: './admin-museum-item.css',
})
export class AdminMuseumItem {
private museumService:ServiceMuseum = inject(ServiceMuseum);
  @Input() museum!:Museum;
  @Output() museumDeleted=new EventEmitter<number>();
  deleteMuseum(museumId :number){
     this.museumService.deleteMuseum(museumId).subscribe(
       data => {
         if(data.success){
          this.museumDeleted.emit(museumId);
         }
         else{
          console.log('error',data.message)
         }
       }
      );

}
}
