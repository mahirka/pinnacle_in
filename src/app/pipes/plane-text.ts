import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planeText'
})
export class PlaneTextPipe implements PipeTransform {

  transform(text: string): string {
    var plane = text ? String(text).replace(/<[^>]*>/g, '') : '';
    return plane
 }
}
