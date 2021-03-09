import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero',
})
export class GeneroPipe implements PipeTransform {
  transform(valor: any): string {
    if (valor == 'M') {
      return 'Masculino';
    } else if (valor == 'F') {
      return 'Feminino';
    }
  }
}
