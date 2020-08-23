import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedValue'
})
export class FixedValuePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value) {
      value = parseFloat(value);
      value = Math.round(value);
    }
    return value;
  }

}
