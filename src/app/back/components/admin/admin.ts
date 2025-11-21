import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceUser } from '../../../services/service-user';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  private fb: FormBuilder=inject(FormBuilder) 
  private serviceUser: ServiceUser=inject(ServiceUser)
  private router:Router=inject(Router);
  userService :ServiceUser=inject(ServiceUser);
    users:User[]=[];
    filteredUsers: User[] = [];
  adminForm!: FormGroup;
ngOnInit(): void {
      this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
 
}
  

onSubmit() {
  if (this.adminForm.invalid) {
    alert('Veuillez remplir le formulaire');
  } else {
    const username=this.adminForm.get('username')?.value;
    const password=this.adminForm.get('password')?.value;
   this.serviceUser.adminLogin(username, password).subscribe(
    data => {
    if (data.success) {
      console.log(data)
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('role', data.user.role);
          this.router.navigate(['/admin/museums']);
        } else {
          alert('Erreur:'+data.message);
        }
});
  }
}
updatePassword(){
   const email = this.adminForm.get('username')?.value?.trim();
  if (!email) {
    alert('Veuillez entrer votre email.');
    return;
  }
  const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Veuillez entrer un email valide.');
    return;
  }
       this.userService.getAllUsers().subscribe(
    data=>{
      if(data.success){
        this.users=data.users;

      }})
this.filteredUsers=this.users.filter(user => user.email==email);
          if (this.filteredUsers.length==0) {
          alert('Email introuvable.');
        } else {
            this.router.navigate(['/forgotpassword',email]);
        }
}

}
