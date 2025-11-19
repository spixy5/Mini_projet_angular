import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUser } from '../../../services/service-user';
import { User } from '../../../models/user';
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn implements OnInit{
  router:Router=inject(Router);
  userService :ServiceUser=inject(ServiceUser);
  users:User[]=[];
  filteredUsers: User[] = [];
  loginForm!: FormGroup;
private fb: FormBuilder=inject(FormBuilder);
 ngOnInit(): void {
     this.loginForm=this.fb.group({
    email: ['', [ Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    password: ['',   [Validators.required,Validators.maxLength(8)]]
  });
  this.userService.getAllUsers().subscribe(
    data=>{
      if(data.success){
        this.users=data.users;

      }
    }
  )
 }

login() {
   if (this.loginForm.invalid) {
    alert("Informations invalides. Veuillez vérifier vos identifiants.");
    return;
  }
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  this.userService.login(email, password).subscribe(
    data => {
    if (data.success) {
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          this.router.navigate(['/home']);
        } else {
          console.log('Erreur:', data.message);
        }
});
}
socialLogin(provider: string) {
  alert(`Connexion avec ${provider} non disponible pour le moment`);
}
routerForgotPass(){
  const email=this.loginForm.get('email');
  if(!email?.value)
{  alert("Veuillez saisir votre adresse e-mail.")}
  else{
if(email.invalid){
    alert('Veuillez saisir correctement votre adresse e-mail.')
}
  else{
     this.filteredUsers = this.users.filter(user => user.email==email.value);
          if (this.filteredUsers.length==0) {
          alert('Email introuvable.');
        } else {
            this.router.navigate(['/forgotpassword',email.value]);
        }
          

}
}
}


}
