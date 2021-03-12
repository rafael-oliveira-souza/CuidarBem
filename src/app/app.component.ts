import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { render } from "creditcardpayments/creditCardPayments";
import { AlertaService, Mensagem } from "./shared/servicos/alerta.service";
import { MensagemEnum } from "./shared/models/enums/MensagemEnum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "AppCuidarBem";

  constructor() {}
}
