import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe para formatação de CPF/CNPJ.
 *
 * Transforma para ###.###.###-## valores que representam CPF.
 *
 * Se o valor informado para o pipe não corresponder a um CPF ou CNPJ o mesmo não sofrerá nenhuma alteração.
 *
 */
@Pipe({
  name: "cpf",
})
export class CpfPipe implements PipeTransform {
  private readonly _REGEX_CPF = new RegExp(/(\d{3})(\d{3})(\d{3})(\d{2})/);
  private readonly _REGEX_CNPJ = new RegExp(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
  );

  transform(valor: any, ...parametros: any[]): any {
    if (valor == null) {
      return "-";
    }

    if (this._REGEX_CPF.test(valor)) {
      return valor.replace(this._REGEX_CPF, "$1.$2.$3-$4");
    }

    return valor;
  }
}
