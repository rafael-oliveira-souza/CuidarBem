import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { HeaderService } from "src/app/shared/servicos/header.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";
import { HomeProdutosSaibaMaisComponent } from "../home-produtos-saiba-mais/home-produtos-saiba-mais.component";

@Component({
  selector: "app-home-produtos",
  templateUrl: "./home-produtos.component.html",
  styleUrls: ["./home-produtos.component.scss"],
})
export class HomeProdutosComponent implements OnInit {
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public situacaoDisponivel = SituacaoProdutoEnum.DISPONIVEL;
  public produtosFiltrados: Array<Produto> = [];
  public produtosBackup: Array<Produto> = [];
  public produtos: Array<Produto> = [];

  public maxItems: number = 6;

  constructor(
    private _storageService: StorageService,
    private _alertaService: AlertaService,
    private _produtoService: ProdutoService,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {
    this._produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtosBackup = produtos;
      this.carregarCarrinho();
    });
  }

  public carregarCarrinho(): void {
    this._storageService
      .getItem<ObjetoEnvio>(StorageEnum.OBJETO_ENVIO)
      .subscribe((objEnvio: ObjetoEnvio) => {
        if (objEnvio != null) {
          this.objetoEnvio = objEnvio;
        }
      });
  }

  public adicionarCarrinnho(produto: Produto): void {
    let produtoNoCarrinho: boolean = false;
    this.objetoEnvio.produtos.forEach((prod) => {
      if (produto.id == prod.id) {
        produtoNoCarrinho = true;
      }
    });

    if (produtoNoCarrinho) {
      this._alertaService.alerta(MensagemEnum.PRODUTO_EXISTE_CARRINHO);
      return;
    } else {
      produto.quantidade++;
      this.objetoEnvio.produtos.push(produto);

      this._storageService.setItem<ObjetoEnvio>(
        StorageEnum.OBJETO_ENVIO,
        this.objetoEnvio
      );

      this._alertaService.sucesso(MensagemEnum.PRODUTO_ADD_CARRINHO);
      return;
    }
  }

  public filtrarProdutos(produtos: Array<Produto>) {
    this.produtosFiltrados = produtos;
    this.paginar(0);
  }

  public paginar(valor: any) {
    let max: number =
      valor + this.maxItems > this.produtosFiltrados.length
        ? this.produtosFiltrados.length
        : valor + this.maxItems;
    this.produtos = this.produtosFiltrados.slice(valor, max);
  }

  public irParaDetalhamento(produto: Produto) {
    const ref = this._dialogService.open(HomeProdutosSaibaMaisComponent, {
      // header: "Detalhamento de produto",
      width: "70%",
      data: { produto: produto, objetoEnvio: this.objetoEnvio },
    });
  }
}
