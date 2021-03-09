import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endereco'
})
export class EnderecoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
