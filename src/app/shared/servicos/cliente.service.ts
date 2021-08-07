import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Cliente } from "../models/classes/Cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  constructor(private _http: HttpClient) {}

  public getClientes() {
    return this._http.get<Array<Cliente>>(
      `${environment.apiServer}/Cliente/todos`
    );
  }

  public salvarCliente(Cliente: Cliente) {
    return this._http.post<any>(
      `${environment.apiServer}/Cliente/salvar`,
      Cliente
    );
  }

  public atualizarCliente(Cliente: Cliente) {
    return this._http.put<any>(
      `${environment.apiServer}/Cliente/atualizar`,
      Cliente
    );
  }

  public removeClienteById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/Cliente/excluir?id=${id}`
    );
  }
}
