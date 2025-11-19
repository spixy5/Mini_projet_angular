import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDatePipe } from '../../../pipe/get-date-pipe';

@Component({
  selector: 'app-admin-modify-museum',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-modify-museum.html',
  styleUrl: './admin-modify-museum.css',
})
export class AdminModifyMuseum {
   museumForm!: FormGroup;
  private fb: FormBuilder=inject(FormBuilder);
  private museumService :ServiceMuseum=inject(ServiceMuseum)
  private route = inject(ActivatedRoute);
 private router: Router=inject(Router);
  museumId?: number;
    museum!: Museum;
  ngOnInit(): void {
     this.museumForm = this.fb.group({
      id: [0],
      photo: ['photos/'],
      name: [''],
      location: [''],
      is_open: [1],
       entry_price: [0],
      opening_hour:['00:00'],
      closing_hour:['00:00'],
      category: ['Archaeological'],
      created_at: [''],
      description: ['',]
    });
     this.museumId=Number(this.route.snapshot.paramMap.get('id'));
      this.museumService.getMuseumById(this.museumId).subscribe(
      data => {
        console.log(data)
        this.museum = data;
        const pipe = new GetDatePipe();
        this.museumForm.patchValue({
        id: this.museum.id,
        photo: this.museum.photo,
        name: this.museum.name,
        location: this.museum.location,
        is_open: this.museum.is_open,
        entry_price: this.museum.entry_price,
        opening_hour: this.museum.opening_hour,
        closing_hour: this.museum.closing_hour,
        category: this.museum.category,
        created_at: pipe.transform(this.museum.created_at),
        description: this.museum.description,
      });
      console.log(this.museumForm.value)
      
    });
   
  }
  OnSubmit(){
    if(this.museumForm.invalid){
      alert('Veuillez remplir correctement tous les champs obligatoires.');
        this.museumForm.markAllAsTouched();
    }
    else{
      this.museumService.updateMuseum(this.museumForm.value).subscribe(
        data=>{
          if(data.success){
            console.log(data);
          
          }
          else{
            alert('erro :'+data.message)
          }
        }
      )
    }

  }

}
