import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semInfo',
})
export class SemInfoPipe implements PipeTransform {
  transform(valor: any): any {
    if (!valor) {
      return 'NÃO INFORMADO';
    }

    return valor;
  }
}
