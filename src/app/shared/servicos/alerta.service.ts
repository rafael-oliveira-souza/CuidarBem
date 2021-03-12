import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class AlertaService {
  constructor(private _messageService: MessageService) {}

  sucesso(msg: string) {
    const alerta: Mensagem = new Mensagem("success", "Sucesso", msg);
    this._messageService.add(alerta);
  }

  alerta(msg: string) {
    const alerta: Mensagem = new Mensagem("warn", "Alerta", msg);
    this._messageService.add(alerta);
  }

  erro(msg: string) {
    const alerta: Mensagem = new Mensagem("error", "Erro", msg);
    this._messageService.add(alerta);
  }

  mensagensMultiplas(msgs: Array<Mensagem>) {
    this._messageService.addAll(msgs);
  }

  clear() {
    this._messageService.clear();
  }
}

export class Mensagem {
  // key?: "tl" | "tc" | "bc";
  severity: "custom" | "success" | "warn" | "info" | "error";
  summary: string;
  detail: string;

  constructor(
    severity: "custom" | "success" | "warn" | "info" | "error",
    summary: string,
    detail: string
  ) {
    // this.key = key;
    this.severity = severity;
    this.summary = summary;
    this.detail = detail;
  }
}
