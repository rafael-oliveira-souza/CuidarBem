import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FaixaEtaria } from "../models/classes/FaixaEtaria";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class FaixaEtariaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor() {}

  public getFaixasEtarias(): Observable<Array<FaixaEtaria>> {
    this.objectSource.next(Mocks.FaixaEtaria);

    return this.observableObject;
  }
}
