import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceUser } from '../../../services/service-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signupForm!: FormGroup;
  router: Router = inject(Router);
  userService: ServiceUser = inject(ServiceUser);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Z][a-zA-Z\s]*$/) ]],
      email: ['',[Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
       confirmPassword: ['', [Validators.required ,this.matchPassword('password')]]});
  }

matchPassword(passwordControlName: string) {
    return (control: any) => {
    if (!control.parent) return null; 
    const passwordValue = control.parent.get(passwordControlName)?.value;
    if (!passwordValue) return null; 
    return control.value===passwordValue ? null : { notMatching: true };
  };

}

  onSubmit(): void {
    if (this.signupForm.invalid) {
    alert("Informations invalides. Veuillez vérifier les champs du formulaire.");
    return;
  }
    const { name, email, password } = this.signupForm.value;
    this.userService.signup(name, email, password).subscribe(
      data => {
        if (data.success) {
          alert('Inscription avec success')
          this.router.navigate(['/login']);
        } else {
          alert('Erreur : '+ data.message);
        }
      },

    );
  }

}
