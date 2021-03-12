import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { ProdutoUtilsConstants } from "src/app/shared/models/constantes/ProdutoUtilsConstante";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { StorageService } from "src/app/shared/servicos/storage.service";

@Component({
  selector: "app-compras-conclusao",
  templateUrl: "./compras-conclusao.component.html",
  styleUrls: ["./compras-conclusao.component.scss"],
})
export class ComprasConclusaoComponent implements OnInit {
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public valorPagamento: number = 0;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.carregarDadosPagamento();
  }

  public goHome() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
  }

  public carregarDadosPagamento(): void {
    this._storageService
      .getItem<ObjetoEnvio>(StorageEnum.OBJETO_ENVIO)
      .subscribe((objEnvio: ObjetoEnvio) => {
        if (objEnvio != null) {
          this.objetoEnvio = objEnvio;
        }
      });
    this.getValorPagamento();
  }

  public getValorPagamento() {
    this.valorPagamento = ProdutoUtilsConstants.getValorTotalProdutos(
      this.objetoEnvio.produtos
    );

    console.log(this.valorPagamento);
  }
}
