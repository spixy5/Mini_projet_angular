import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceUser } from '../../../services/service-user';
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn implements OnInit{
  router:Router=inject(Router);
  userService :ServiceUser=inject(ServiceUser);
  loginForm!: FormGroup;
private fb: FormBuilder=inject(FormBuilder);
 ngOnInit(): void {
     this.loginForm=this.fb.group({
    email: ['', [ Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    password: ['',   [Validators.required,Validators.maxLength(8)]]
  });
 }

login() {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  this.userService.login(email, password).subscribe(
    data => {
    if (data.success) {
          localStorage.setItem('userID', data.user.id);
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

}
