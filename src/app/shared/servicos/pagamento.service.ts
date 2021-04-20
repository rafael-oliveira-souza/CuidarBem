import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "../models/classes/Pedido";
import { environment } from "src/environments/environment";
import { Pagamento } from "../models/classes/Pagamento";

@Injectable({
  providedIn: "root",
})
export class PagamentoService {
  constructor(private _http: HttpClient) {}

  public criarPedido(pedido: Pedido): Observable<any> {
    let jsonPedido = JSON.stringify(pedido);
    return this._http.post<any>(
      `${environment.mercadoPago}/checkout/preferences`,
      jsonPedido
    );
  }

  public getPedidoById(id: number): Observable<any> {
    return this._http.get<any>(
      `${environment.mercadoPago}/checkout/preferences/${id}`
    );
  }

  public criarPagamento(pagamento: Pagamento): Observable<Pagamento> {
    return this._http.post<Pagamento>(
      `${environment.apiServer}/pagamento`,
      pagamento
    );
  }

  // public finalizarPedido(pedido: Pedido): Observable<Pagamento> {
  //   this.criarPedido(pedido).subscribe((resultado) => {
  //     date_created;

  //     this.criarPagamento()
  //   });
  // }
}
