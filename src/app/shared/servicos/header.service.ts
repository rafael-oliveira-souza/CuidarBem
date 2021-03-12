import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private objectSource = new BehaviorSubject("");
  private observableObject: Observable<any> = this.objectSource.asObservable();

  constructor() {}

  getValorPesquisa(): Observable<string> {
    return this.observableObject;
  }

  setValorPesquisa(valor: string): void {
    this.objectSource.next(valor);
  }
}
