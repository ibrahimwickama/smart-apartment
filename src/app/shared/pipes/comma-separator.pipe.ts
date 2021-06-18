import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparator'
})
export class CommaSeparatorPipe implements PipeTransform {

  transform(value: any): any {
    const formattedValue = (value || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue ? formattedValue : '0';
  }

}