import { Pipe, PipeTransform } from "@angular/core";
import { DataUtilsConstants } from "../models/constantes/DataUtilsConstante";

@Pipe({
  name: "data",
})
export class DataPipe implements PipeTransform {
  transform(valor: any, args?: any): any {
    return DataUtilsConstants.dataConvertDateToString(valor, args);
  }
}
