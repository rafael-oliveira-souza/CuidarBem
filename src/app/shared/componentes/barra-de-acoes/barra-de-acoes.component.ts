import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-barra-de-acoes",
  templateUrl: "./barra-de-acoes.component.html",
  styleUrls: ["./barra-de-acoes.component.scss"],
})
export class BarraDeAcoesComponent implements OnInit {
  constructor(private _dialogService: DialogService, private _router: Router) {}

  ngOnInit() {}

  public abrirLogin() {
    const ref = this._dialogService.open(LoginComponent, {
      header: "",
      width: "70%",
    });
  }

  public abrirCadastro() {
    const ref = this._dialogService.open(CadastroComponent, {
      header: "",
      width: "70%",
    });
  }

  public abrirCarrinho() {
    this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
  }
}
