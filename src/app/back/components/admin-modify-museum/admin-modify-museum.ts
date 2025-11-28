import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceMuseum } from '../../../services/service-museum';
import { Museum } from '../../../models/museum';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetDatePipe } from '../../../pipe/get-date-pipe';
import { ServiceUser } from '../../../services/service-user';
@Component({
  selector: 'app-admin-modify-museum',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-modify-museum.html',
  styleUrl: './admin-modify-museum.css',
})
export class AdminModifyMuseum {
   museumForm!: FormGroup;
  readonly fb: FormBuilder=inject(FormBuilder);
  readonly museumService :ServiceMuseum=inject(ServiceMuseum)
 readonly route = inject(ActivatedRoute);
 readonly router: Router=inject(Router);
 readonly userService:ServiceUser=inject(ServiceUser);
  museumId?: number;
    museum!: Museum;
  pipe = new GetDatePipe();
  ngOnInit(): void {
     this.museumForm = this.fb.group({
      id: [0],
      photo: ['photos/',Validators.required],
      name: ['',[Validators.required ,Validators.minLength(2)]],
      location: ['',[Validators.required,Validators.minLength(2)]],
      is_open: [1],
       entry_price: [0,[Validators.required ,Validators.min(0.1)]],
      opening_hour:['00:00'],
      closing_hour:['00:00'],
      category: [''],
      created_at: [''],
      description: ['',Validators.required]
    });
     this.museumId=Number(this.route.snapshot.paramMap.get('id'));
      this.museumService.getMuseumById(this.museumId).subscribe(
      data => {
        this.museum = data;
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
        created_at: this.pipe.transform(this.museum.created_at),
        description: this.museum.description,
      });
      
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
            this.museum=data.museum;
               const userId = Number(localStorage.getItem('userId'));
              this.userService.updateActivity(userId).subscribe(
                data=>console.log(data)
              );
               alert("Musée mis à jour avec succès");
              this.router.navigate(['/admin/museums']);


          }
          else{
            alert('erro :'+data.message)
          }
        }
      )
    }

  }
  onReset(){
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
        created_at: this.pipe.transform(this.museum.created_at),
        description: this.museum.description,
      });
}

}
