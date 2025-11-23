import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startHour'
})
export class StartHourPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    let hourStr=value.split('-')[0].split(':')[0];
    let hour=Number(hourStr);
    let suffix = '';
    if (hour==0) {
      hour=12;
      suffix ='du matin';
    } else if (hour < 12) {
      suffix='du matin';
    } else if (hour==12) {
      suffix ='de l’après-midi';
    } else {
      hour = hour - 12;
      suffix ='de l’après-midi'; 
    }
    return `${hour} ${suffix}`;
  }

}
