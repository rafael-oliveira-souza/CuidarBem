import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FaixaEtaria } from "../models/classes/FaixaEtaria";
import { Mocks } from "../models/constantes/Mocks";

@Injectable({
  providedIn: "root",
})
export class FaixaEtariaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(private _http: HttpClient) {}

  public getFaixasEtarias(): Observable<Array<FaixaEtaria>> {
    // this.objectSource.next(Mocks.FaixaEtaria);
    // return this.observableObject;
    return this._http.get<Array<FaixaEtaria>>(
      `${environment.apiServer}/faixa/todos`
    );
  }

  public getFaixaEtariaById(id: number): Observable<FaixaEtaria> {
    return this._http.get<FaixaEtaria>(
      `${environment.apiServer}/faixa?id=${id}`
    );
  }

  public removeFaixaById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/faixa/excluir?id=${id}`
    );
  }
}
