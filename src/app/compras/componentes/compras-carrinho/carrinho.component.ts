import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
import { ProdutoUtilsConstants } from "src/app/shared/models/constantes/ProdutoUtilsConstante";
import { StorageUtilsConstante } from "src/app/shared/models/constantes/StorageUtilsConstante";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { StorageService } from "src/app/shared/servicos/storage.service";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.component.html",
  styleUrls: ["./carrinho.component.scss"],
})
export class CarrinhoComponent implements OnInit {
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public valorTotal: number = 0;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    // this.produtos = Mocks.Produtos;
    this.carregarCarrinho();
  }

  public carregarCarrinho(): void {
    this._storageService
      .getItem<ObjetoEnvio>(StorageEnum.OBJETO_ENVIO)
      .subscribe((objEnvio: ObjetoEnvio) => {
        if (objEnvio != null) {
          this.objetoEnvio = objEnvio;
          this.getValorTotal();
        }
      });
  }

  public definirValorDesconto(valor: number, produto: Produto) {
    // produto.valorDesconto = valor * produto.valor * Mocks.Descontos[0];
  }

  public getValor(produto: Produto) {
    return produto.valor - produto.valorDesconto;
  }

  public getValorTotal() {
    this.valorTotal = ProdutoUtilsConstants.getValorTotalProdutos(
      this.objetoEnvio.produtos
    );
  }

  public atualizarQuantidade(value: number, produto: Produto) {
    if (value) {
      produto.quantidade = value > produto.estoque ? produto.estoque : value;
    }

    this.getValorTotal();
    this._storageService.setItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO,
      this.objetoEnvio
    );
  }

  public getNomeCategoria(categoria: number) {
    return ProdutoUtilsConstants.getNomeCategoria(categoria);
  }
  public getSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getCorSituacaoEstoque(situacao);
  }

  public continuarComprando() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
  }

  public finalizarCompra() {
    if (this.valorTotal <= 0) {
      this._alertaService.alerta(MensagemEnum.COMPRA_SEM_QUANTIDADE_ITEMS);
    } else {
      this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CONCLUSAO]);
    }
  }
}
