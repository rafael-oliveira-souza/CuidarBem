import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Pacote } from "../models/classes/Pacote";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class LocacaoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor() {}

  public getPacotes(): Observable<Array<Pacote>> {
    this.objectSource.next(Mocks.Pacotes);

    return this.observableObject;
  }
}
