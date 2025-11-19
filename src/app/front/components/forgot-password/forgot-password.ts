import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceUser } from '../../../services/service-user';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit{
    private fb: FormBuilder=inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private userService:ServiceUser=inject(ServiceUser);
    private router :Router=inject(Router)
    email!:string;
    showTips=false;
    sentCode!:string;
forgotPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.email=this.route.snapshot.paramMap.get('email') ?? "";
    this.forgotPasswordForm = this.fb.group({
      confirmationCode: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
       confirmPassword: ['', [Validators.required ,this.matchPassword('password')]]});
        this.userService.sendConfirmationCode(this.email).subscribe(data => {
            if (data.success) {
              console.log(data.code); 
               this.sentCode=data.code;
              alert("Un code a été envoyé à votre e-mail.");
            } else {
              alert("Erreur : " + data.message);
            }
          });

       
  }

  matchPassword(passwordControlName: string) {
    return (control: any) => {
    if (!control.parent) return null; 
    const passwordValue = control.parent.get(passwordControlName)?.value;
    if (!passwordValue) return null; 
    return control.value === passwordValue ? null : { notMatching: true };
  };}
 onSubmit(): void {
  if (this.forgotPasswordForm.valid) {
    const providedCode=this.forgotPasswordForm.value.confirmationCode;
    const newPassword=this.forgotPasswordForm.value.password;
    if (providedCode==this.sentCode) {
      this.userService.updatePassword(this.email, newPassword).subscribe(data => {
        if (data.success) {
          alert(data.message);
          this.router.navigate(['/login']);
        } else {
          alert('Erreur: ' + data.message);
        }
      });
    } else {
      alert("Code de confirmation invalide.");
    }

  } else {
    alert("Veuillez remplir tous les champs correctement.");
  }
}

  toggleTips() {
  this.showTips = !this.showTips;
}
}
