import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Museum } from '../../../models/museum';
import { ActivatedRoute } from '@angular/router';
import { ServiceMuseum } from '../../../services/service-museum';
import { DatePipe } from '@angular/common';
import { StartHourPipe } from '../../../pipe/start-hour-pipe';
import { PromoCode } from '../../../models/promo-code';

@Component({
  selector: 'app-pay-ticket-museum',
  imports: [ReactiveFormsModule,DatePipe,StartHourPipe],
  templateUrl: './pay-ticket-museum.html',
  styleUrl: './pay-ticket-museum.css',
})
export class PayTicketMuseum implements OnInit {
private fb: FormBuilder=inject(FormBuilder);
private route : ActivatedRoute=inject(ActivatedRoute)
private museumService:ServiceMuseum=inject(ServiceMuseum);
private cd: ChangeDetectorRef=inject(ChangeDetectorRef);
 paymentForm!: FormGroup;
 museum!:Museum;
 totalAmount: number=0;
 promocodes:PromoCode[]=[];
 timeSlots:string[]=[];
 showConditions:boolean=false;
  ngOnInit(): void {
  this.paymentForm = this.fb.group({
    visitDetails: this.fb.group({
      visitDate: ['', [Validators.required, this.DateValid()]],
      timeSlot: ['', Validators.required],
      ticketType: ['adult', Validators.required],
      ticketCount: [1, [Validators.required, Validators.min(1)]],
       promoCode: ['', [this.promoCodeValidator.bind(this)]]
    }),
    cardName: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z ]+$')]],
    cardNumber: ['', [Validators.required, Validators.pattern('\\d{16}')]],
    expiryDate: ['', [Validators.required,, this.DateValid()]],
    cvc: ['', [Validators.required, Validators.pattern('\\d{3}')]],
    terms: [false, Validators.requiredTrue]
  });

  this.museumService.getAllPromoCodes().subscribe(data => {
    if (data.success) {
      this.promocodes=data.promoCodes;
      console.log(data.promoCodes)
    }
  });

  const museumId = Number(this.route.snapshot.paramMap.get('id'));
  this.museumService.getMuseumById(museumId).subscribe(data => {
    this.museum = data;
    this.totalAmount= this.museum ? this.museum.entry_price : 0;
    this.generateTimeSlots();
    this.paymentForm.get('visitDetails')?.patchValue({
      timeSlot: this.timeSlots.length > 0 ? this.timeSlots[0] : ''
    });
  });
}


 DateValid() {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) 
      return null; 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(control.value);
    return inputDate >= today ? null : { pastDate: true };
  };
}
generateTimeSlots(){
 const startHour = parseInt(this.museum.opening_hour.toString().split(':')[0], 10);
    const endHour = parseInt(this.museum.closing_hour.toString().split(':')[0], 10);
    this.timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const nextHour = hour + 1;
      const slot = `${hour.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`;
      this.timeSlots.push(slot);
    }
}
selectTicketType(type: string) {
  this.paymentForm.get('visitDetails.ticketType')?.patchValue(type);
  const visitDetails = this.paymentForm.get('visitDetails')?.value;
  let price=this.museum.entry_price;
  let ticketCount=visitDetails.ticketCount;
  let discountAmount = 0;
  switch (type) {
    case 'student':
      discountAmount=0.2 * price; 
      break;
    case 'child':
      discountAmount=0.5 * price;
      break;
    case 'group':
      price=price*5;
      discountAmount=0.1 * price; 
      break;
    default: 
      discountAmount = 0;
  }

 this.totalAmount=(((price - discountAmount) * ticketCount + 2 - this.reduction(price * ticketCount)));
}

  promoCodeValide(): boolean {
  const code=this.paymentForm.get('visitDetails.promoCode')?.value;
  if (!code) return false;
  const promo=this.promocodes.find(p => p.code.toUpperCase()==code.toUpperCase()
  );
  if (!promo) return false;     
  if (promo?.used==true) return false;  
  return true; 
}
   reduction(totalPrice: number): number {
  const code=this.paymentForm.get('visitDetails.promoCode')?.value;
  const promo=this.promocodes.find(p => p.code.toUpperCase()==code.toUpperCase()
  );
const discount = Number((totalPrice*((promo?.percentage || 0) / 100)).toFixed(2));
  return discount;
}
promoCodeValidator(control: any) {
  if (!control.value) return null;
  return this.promoCodeValide() ? null : { invalidPromo: true };
}
toggleConditions(){
  this.showConditions=!this.showConditions;
}

onSubmit() {
 if (this.paymentForm.invalid) {
  alert('Veuillez remplir correctement tous les champs obligatoires.');
  this.paymentForm.markAllAsTouched();
} else {
const userId = Number(localStorage.getItem('userId'));
const userEmail = localStorage.getItem('userEmail');
const visitDetails = this.paymentForm.get('visitDetails')?.value;
this.totalAmount-=this.reduction(this.totalAmount);
const ticketData = {
  user_id: userId,
  email: userEmail,
  museum_id: this.museum.id,
  museumName: this.museum.name,
 totalAmount: this.totalAmount,
  numberOfTickets: visitDetails.ticketCount,
  visitDate: visitDetails.visitDate,
  ticketType: visitDetails.ticketType,
  promoCode: visitDetails.promoCode || null
};

this.museumService.sendTicketPayment(ticketData).subscribe(
  data => {
    if (data.success) {
      alert('Paiement réussi ! Un email vous a été envoyé.');
      console.log(data);
      this.paymentForm.reset();
      this.paymentForm.get('visitDetails')?.patchValue({
        ticketCount: 1,
        timeSlot: this.timeSlots.length > 0 ? this.timeSlots[0] : ''
      });
        if (ticketData.promoCode) {
          this.museumService.markPromoCodeAsUsed(ticketData.promoCode).subscribe(data => {
            if (data.success) {
              console.log('Code promo marqué comme utilisé.');
            } else {
              console.warn('Erreur lors de la mise à jour du code promo :', data.message);
            }
          });
        }
    } else {
      alert('Erreur lors du paiement : ' + data.message);
    }
  }
);

}
}
}
