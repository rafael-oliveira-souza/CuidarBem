import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ObjetoEnvio } from "../models/classes/ObjetoEnvio";
import { Pacote } from "../models/classes/Pacote";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class PacoteService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getPacotes(): Observable<Array<Pacote>> {
    let pacotes: Pacote[] = this._storageService.getItem(StorageEnum.PACOTES);
    if (pacotes && pacotes.length > 0) {
      return new BehaviorSubject(pacotes).asObservable();
    } else {
      return this._http.get<any>(`${environment.apiServer}/pacote/todos`);
    }
  }

  public getPacoteById(idPacote: number): Observable<Pacote> {
    return this._http.get<Pacote>(
      `${environment.apiServer}/pacote/${idPacote}`
    );
  }

  public removePacoteById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/pacote/excluir/${id}`
    );
  }
}
