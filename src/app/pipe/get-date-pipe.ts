import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {
   transform(value: Date): string | null {
    if (!value) return null;
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
     return `${year}-${month}-${day}`;
  }

}

