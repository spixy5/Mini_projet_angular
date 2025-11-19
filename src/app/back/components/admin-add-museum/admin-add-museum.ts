import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Museum } from '../../../models/museum';
import { ServiceMuseum } from '../../../services/service-museum';

@Component({
  selector: 'app-admin-add-museum',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-add-museum.html',
  styleUrl: './admin-add-museum.css',
})
export class AdminAddMuseum implements OnInit{
  museumForm!: FormGroup;
  private fb: FormBuilder=inject(FormBuilder);
  private museumService :ServiceMuseum=inject(ServiceMuseum)
  ngOnInit(): void {
    this.museumForm = this.fb.group({
      imagePath: ['photos/',Validators.required],
      museumName: ['', [Validators.required , Validators.minLength(2)]],
      address: ['', [Validators.required , Validators.minLength(2)]],
      opening: [1, Validators.required],
      price: [0, [Validators.required , Validators.min(0.1)]],
      openingHour:['00:00',Validators.required],
      closingHour:['00:00',Validators.required],
      category: ['Archaeological', Validators.required],
      creationDate: ['', Validators.required],
      description: ['',Validators.required]
    });
  }
  OnSubmit(){
    if(this.museumForm.invalid){
       alert('Veuillez remplir correctement tous les champs obligatoires.');
        this.museumForm.markAllAsTouched();
    }
    else{
      const museumData :Museum = {
          id: this.museumForm.get(' museum_id')?.value,
          name:  this.museumForm.get('museumName')?.value,
          location: this.museumForm.get('address')?.value,
          photo: this.museumForm.get('imagePath')?.value,
          is_open: this.museumForm.get('opening')?.value,
          entry_price: this.museumForm.get('price')?.value,
          opening_hour: this.museumForm.get('openingHour')?.value,
          closing_hour: this.museumForm.get('closingHour')?.value,
          category: this.museumForm.get('category')?.value,
          created_at: this.museumForm.get('creationDate')?.value,
          description: this.museumForm.get('description')?.value,
};
      this.museumService.createMuseum(museumData).subscribe(
        data =>{
          if(data.success){
            console.log(data)
          alert('Musée ajouté avec succès'); 
          }
          else{
            alert('erro :'+data.mesage)
          }
        }
      )
    }
  }


}
