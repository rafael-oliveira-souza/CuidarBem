import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Categoria } from "../models/classes/Categoria";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor() {}

  public getCategorias(): Observable<Array<Categoria>> {
    this.objectSource.next(Mocks.Categorias);

    return this.observableObject;
  }
}
