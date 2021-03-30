import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Pacote } from "../models/classes/Pacote";

@Injectable({
  providedIn: "root",
})
export class LocacaoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(private _http: HttpClient) {}

  public getPacotes(): Observable<Array<Pacote>> {
    return this._http.get<any>(`${environment.api_server}/pacote/todos`);
  }

  public getPacoteById(idPacote: number): Observable<Pacote> {
    return this._http.get<Pacote>(
      `${environment.api_server}/pacote?id=${idPacote}`
    );
  }

  public removePacoteById(id: number) {
    return this._http.delete<any>(
      `${environment.api_server}/pacote/excluir?id=${id}`
    );
  }
}
