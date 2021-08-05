import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Pedido } from "../models/classes/Pedido";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  constructor(private _http: HttpClient) {}

  public getPedidos() {
    return this._http.get<Array<Pedido>>(
      `${environment.apiServer}/pedido/todos`
    );
  }

  public salvarPedido(pedido: Pedido) {
    return this._http.post<any>(
      `${environment.apiServer}/pedido/salvar`,
      pedido
    );
  }

  public atualizarPedido(pedido: Pedido) {
    return this._http.put<any>(
      `${environment.apiServer}/pedido/atualizar`,
      pedido
    );
  }

  public removePedidoById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/pedido/excluir?id=${id}`
    );
  }
}
