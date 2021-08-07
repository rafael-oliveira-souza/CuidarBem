import { Injectable } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlertaService {
  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ativarModalConfirmacao(
    header: string,
    exibeBtnCanc = true,
    funcAceit: Function,
    funcCanc?: Function
  ) {
    this._confirmationService.confirm({
      header: header,
      message: null,
      acceptLabel: "Sim",
      rejectLabel: "Não",
      rejectVisible: exibeBtnCanc,
      accept: () => {
        funcAceit.call(null);
      },
      reject: () => {
        if (funcCanc) {
          funcCanc.call(null);
        }
      },
    });
  }

  sucesso(msg: string, life?: number) {
    const alerta: Mensagem = new Mensagem("success", "Sucesso", msg, life);
    this._messageService.add(alerta);
  }

  alerta(msg: string, life?: number) {
    const alerta: Mensagem = new Mensagem("warn", "Alerta", msg, life);
    this._messageService.add(alerta);
  }

  erro(msg: string, life?: number) {
    const alerta: Mensagem = new Mensagem("error", "Erro", msg, life);
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
  life: number;

  constructor(
    severity: "custom" | "success" | "warn" | "info" | "error",
    summary: string,
    detail: string,
    life = 3500
  ) {
    // this.key = key;
    this.severity = severity;
    this.summary = summary;
    this.detail = detail;
    this.life = life;
  }
}
