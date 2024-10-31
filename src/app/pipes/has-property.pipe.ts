import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasProperty',
  standalone: true
})
export class HasPropertyPipe implements PipeTransform {

  transform(data: any, property: string): boolean {
    // Sprawdza, czy data jest obiektem i czy zawiera właściwość podaną jako parametr
    return data != null && typeof data === 'object' && property in data;
  }

}
