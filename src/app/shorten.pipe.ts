import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringShortener',
})
export class StringShortener implements PipeTransform {
  transform(value: any, maxLength: number) {
    console.log('pipe being applied!');
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    } else {
      return value;
    }
  }
}
