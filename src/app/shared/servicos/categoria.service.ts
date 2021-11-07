import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categoria } from "../models/classes/Categoria";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getCategorias(): Observable<Array<Categoria>> {
    let categorias: Categoria[] = this._storageService.getItem(
      StorageEnum.CATEGORIAS
    );
    if (categorias && categorias.length > 0) {
      return new BehaviorSubject(categorias).asObservable();
    } else {
      return this._http.get<any>(`${environment.apiServer}/categoria/todos`);
    }
  }

  public getCategoriaById(idCategoria: number): Observable<Categoria> {
    return this._http.get<Categoria>(
      `${environment.apiServer}/categoria/${idCategoria}`
    );
  }

  public removeCategoriaById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/categoria/excluir/${id}`
    );
  }
}
