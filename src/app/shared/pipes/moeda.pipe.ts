import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

@Pipe({
  name: "moeda",
})
export class MoedaPipe implements PipeTransform {
  private readonly _currency = new CurrencyPipe("pt");

  transform(valor: any): any {
    if (!valor || isNaN(valor)) {
      return "R$ 0,00";
    } else {
      return this._currency.transform(parseFloat(valor), "BRL");
    }
  }
}
