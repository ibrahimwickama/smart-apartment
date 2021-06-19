import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'washerdryerStringify',
})
export class WasherDryerPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split('_');
    const formattedValue = (words || [])
      .map((word) => word.toLowerCase())
      .join(' ');
    return formattedValue ? formattedValue : '';
  }
}
