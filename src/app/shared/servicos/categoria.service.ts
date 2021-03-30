import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categoria } from "../models/classes/Categoria";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(private _http: HttpClient) {}

  public getCategorias(): Observable<Array<Categoria>> {
    return this._http.get<any>(`${environment.api_server}/categoria/todos`);
  }

  public getCategoriaById(idCategoria: number): Observable<Categoria> {
    return this._http.get<Categoria>(
      `${environment.api_server}/categoria?id=${idCategoria}`
    );
  }

  public removeCategoriaById(id: number) {
    return this._http.delete<any>(
      `${environment.api_server}/categoria/excluir?id=${id}`
    );
  }
}
