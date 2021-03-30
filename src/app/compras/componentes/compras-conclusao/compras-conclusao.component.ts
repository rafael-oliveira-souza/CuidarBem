import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
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
    private _locacaoService: LocacaoService,
    private _produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarDadosPagamento();
  }

  public goHome() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
  }

  public carregarDadosPagamento(): void {
    this.objetoEnvio = this._storageService.getItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO
    );

    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.getValorPagamento(this.objetoEnvio, pacotes);
    });
  }

  public getValorPagamento(objetoEnvio: ObjetoEnvio, pacotes: Pacote[]) {
    this.valorPagamento = this._produtoService.getValorTotalProdutos(
      objetoEnvio.produtos,
      pacotes
    );
  }
}
