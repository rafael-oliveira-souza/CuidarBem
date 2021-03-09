import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'continue',
})
export class ContinuePipe implements PipeTransform {
  transform(valor: string, tamanho?: number): any {
    if(!valor) {
      return ''
    }
    return valor.substring(0, tamanho) + '...';
  }
}
