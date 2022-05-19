import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineBreak'
})
export class NewlineBreakPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    let val = value.replace(/\n/g, '<br/>');
    console.log(val);
    return val.replace(/ /g, '&nbsp;');
 }
}
