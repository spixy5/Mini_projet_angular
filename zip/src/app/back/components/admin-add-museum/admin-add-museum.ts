import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceMuseum } from '../../../services/service-museum';
import {  Router, RouterLink } from '@angular/router';
import { ServiceUser } from '../../../services/service-user';

@Component({
  selector: 'app-admin-add-museum',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-add-museum.html',
  styleUrl: './admin-add-museum.css',
})
export class AdminAddMuseum implements OnInit{
  museumForm!: FormGroup;
  private fb: FormBuilder=inject(FormBuilder);
  private museumService :ServiceMuseum=inject(ServiceMuseum)
  private router:Router=inject(Router);
  private userService:ServiceUser=inject(ServiceUser)
  ngOnInit(): void {
    this.museumForm = this.fb.group({
      photo: ['photos/',Validators.required],
      name: ['', [Validators.required , Validators.minLength(2)]],
      location: ['', [Validators.required , Validators.minLength(2)]],
      is_open: [1, Validators.required],
      entry_price: [0, [Validators.required , Validators.min(0.1)]],
      opening_hour:['00:00',Validators.required],
      closing_hour:['00:00',Validators.required],
      category: ['Archaeological', Validators.required],
      created_at: ['', Validators.required],
      description: ['',Validators.required]
    });
  }
  OnSubmit(){
    if(this.museumForm.invalid){
       alert('Veuillez remplir correctement tous les champs obligatoires.');
        this.museumForm.markAllAsTouched();
    }
    else{

      this.museumService.createMuseum(this.museumForm.value).subscribe(
        data =>{
          if(data.success){
            console.log(data)
           
          alert('Musée ajouté avec succès'); 
            const userId = Number(localStorage.getItem('userId'));
              this.userService.updateActivity(userId).subscribe(
                data=>console.log(data)
              );
              this.router.navigate(['/admin/museums']);
          }
          else{
            alert('erro :'+data.mesage)
          }
        }
      )
    }
  }
onReset(){
  this.museumForm.reset();
this.museumForm.get('photo')?.setValue('photos/');
this.museumForm.get('opening_hour')?.setValue('00:00');
this.museumForm.get('closing_hour')?.setValue('00:00');
this.museumForm.get('entry_price')?.setValue(0);
this.museumForm.get('category')?.setValue('Archaeological');
this.museumForm.get('is_open')?.setValue(1);

}

}
