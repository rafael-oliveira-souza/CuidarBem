import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FaixaEtaria } from "../models/classes/FaixaEtaria";
import { Mocks } from "../models/constantes/Mocks";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class FaixaEtariaService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getFaixasEtarias(): Observable<Array<FaixaEtaria>> {
    let faixas: FaixaEtaria[] = this._storageService.getItem(
      StorageEnum.FAIXAS
    );
    if (faixas && faixas.length > 0) {
      return new BehaviorSubject(faixas).asObservable();
    } else {
      return this._http.get<Array<FaixaEtaria>>(
        `${environment.apiServer}/faixa/todos`
      );
    }
  }

  public getFaixaEtariaById(id: number): Observable<FaixaEtaria> {
    return this._http.get<FaixaEtaria>(`${environment.apiServer}/faixa/${id}`);
  }

  public removeFaixaById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/faixa/excluir/${id}`
    );
  }
}
