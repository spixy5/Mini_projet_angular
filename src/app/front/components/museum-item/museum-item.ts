import { Component, Input } from '@angular/core';
import { Museum } from '../../../models/museum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-museum-item',
  imports: [RouterLink],
  templateUrl: './museum-item.html',
  styleUrl: './museum-item.css',
})
export class MuseumItem {
   @Input() museum!: Museum;

}
