import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
import { ProdutoUtilsConstants } from "src/app/shared/models/constantes/ProdutoUtilsConstante";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.component.html",
  styleUrls: ["./carrinho.component.scss"],
})
export class CarrinhoComponent implements OnInit {
  public produtos: Array<Produto> = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.produtos = Mocks.Produtos;
  }

  public getTotal(): number {
    let total: number = 0;

    this.produtos.forEach((prod) => {
      total += prod.valor * prod.quantidade;
    });

    return total;
  }

  public atualizarQuantidade(value: number, produto: Produto) {
    let valor = 0;
    if (value) {
      valor = value > produto.estoque ? produto.estoque : value;
    }

    value = valor;
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
    this._router.navigate([RotasEnum.HOME, RotasEnum.PRODUTOS]);
  }

  public finalizarCompra() {}
}
