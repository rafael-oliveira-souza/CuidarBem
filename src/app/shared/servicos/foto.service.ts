import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Imagem } from "../models/classes/Imagem";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class FotoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(private _http: HttpClient) {}

  public getImagensProdutosPorId(id: number): Observable<Array<Imagem>> {
    return this._http.get<Array<Imagem>>(
      `${environment.apiServer}/getImagensPorId?id=${id}`
    );
  }
  public getImagensPorDiretorios(diretorio: string): Observable<Array<Imagem>> {
    return this._http.get<Array<Imagem>>(
      `${environment.apiServer}/getImagensPorDiretorio?diretorio=${diretorio}`
    );
  }
}
