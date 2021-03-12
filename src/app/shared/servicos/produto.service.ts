import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Produto } from "../models/classes/Produto";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor() {}

  public getProdutos(): Observable<Array<Produto>> {
    this.objectSource.next(Mocks.Produtos);

    return this.observableObject;
  }
}
