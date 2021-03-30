import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertaService } from "./alerta.service";
import { CartaoCredito } from "../models/classes/CartaoCredito";
import { Cliente } from "../models/classes/Cliente";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PagamentoService {
  constructor(
    private _http: HttpClient,
    private _alertaService: AlertaService
  ) {}

  public efetuarPagamento(
    usuario: Cliente,
    cartao: CartaoCredito
  ): Observable<{
    checkout: {
      code: string;
      date: Date;
    };
  }> {
    return null;
  }
}
