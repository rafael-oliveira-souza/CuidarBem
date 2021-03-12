import { Component, Input, OnInit, Output } from "@angular/core";
import { render } from "creditcardpayments/creditCardPayments";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";

@Component({
  selector: "app-pagamento",
  templateUrl: "./pagamento.component.html",
  styleUrls: ["./pagamento.component.scss"],
})
export class PagamentoComponent implements OnInit {
  @Input("valorPagamento")
  public valorPagamento: number = 0;

  constructor(private _alertaService: AlertaService) {}

  ngOnInit(): void {
    if (this.valorPagamento > 0) {
      this.criarPedido();
    }
  }

  public criarPedido() {
    render({
      id: "#paypalTag",
      currency: "BRL",
      value: this.valorPagamento.toString(),
      onApprove: (details) => {
        this._alertaService.sucesso(MensagemEnum.COMPRA_EFETUADA_COM_SUCESSO);
      },
    });
  }
}
