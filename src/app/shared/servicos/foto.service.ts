import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class FotoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor() {}

  public getImagens(): Observable<Array<any>> {
    this.objectSource.next(Mocks.Imagens);

    return this.observableObject;
  }
}
