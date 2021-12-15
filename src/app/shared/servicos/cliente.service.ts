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

  public criarCliente(cliente: Cliente) {
    return this._http.post<any>(`${environment.apiServer}/cliente`, cliente);
  }

  public getClientes() {
    return this._http.get<Array<Cliente>>(
      `${environment.apiServer}/cliente/todos`
    );
  }

  public getClienteByEmail(email: string): Observable<Cliente> {
    return this._http.get<Cliente>(
      `${environment.apiServer}/cliente/buscarPorEmail/${email}`
    );
  }

  public salvarCliente(Cliente: Cliente) {
    return this._http.post<any>(
      `${environment.apiServer}/cliente/salvar`,
      Cliente
    );
  }

  public atualizarCliente(Cliente: Cliente) {
    return this._http.put<any>(
      `${environment.apiServer}/cliente/atualizar`,
      Cliente
    );
  }

  public removeClienteById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/cliente/excluir/${id}`
    );
  }
}
