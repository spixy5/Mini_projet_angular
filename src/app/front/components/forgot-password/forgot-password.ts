import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
    private fb: FormBuilder=inject(FormBuilder);
    private route = inject(ActivatedRoute);
    email!:string;
    showTips=false;
forgotPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.email=this.route.snapshot.paramMap.get('email') ?? "";
    this.forgotPasswordForm = this.fb.group({
      securityCode: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
       confirmPassword: ['', [Validators.required ,this.matchPassword('password')]]});
       

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
      console.log('Form submitted', this.forgotPasswordForm.value);
    }
  }
  toggleTips() {
  this.showTips = !this.showTips;
}
}
