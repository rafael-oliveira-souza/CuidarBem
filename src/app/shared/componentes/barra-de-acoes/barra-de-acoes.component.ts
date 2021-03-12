import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { ObjetoEnvio } from "../../models/classes/ObjetoEnvio";
import { ProdutoUtilsConstants } from "../../models/constantes/ProdutoUtilsConstante";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { StorageEnum } from "../../models/enums/StorageEnum";
import { MoedaPipe } from "../../pipes/moeda.pipe";
import { StorageService } from "../../servicos/storage.service";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-barra-de-acoes",
  templateUrl: "./barra-de-acoes.component.html",
  styleUrls: ["./barra-de-acoes.component.scss"],
})
export class BarraDeAcoesComponent implements OnInit {
  public moedaPipe: MoedaPipe = new MoedaPipe();
  public labelCarrinho: string = `Carrinho: 0 Itens - R$ 0,00`;

  constructor(
    private _dialogService: DialogService,
    private _router: Router,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  public carregarCarrinho(): void {
    this._storageService
      .getItem<ObjetoEnvio>(StorageEnum.OBJETO_ENVIO)
      .subscribe((objEnvio: ObjetoEnvio) => {
        if (objEnvio != null) {
          this.labelCarrinho = `Carrinho: ${objEnvio.produtos.length}
          Itens - ${this.moedaPipe.transform(
            ProdutoUtilsConstants.getValorTotalProdutos(objEnvio.produtos)
          )}`;
        }
      });
  }

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
