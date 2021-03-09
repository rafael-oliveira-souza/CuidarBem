import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "../../models/classes/Produto";
import { ProdutoUtilsConstants } from "../../models/constantes/ProdutoUtilsConstante";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "../../models/enums/SituacaoProdutoEnum";

@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.scss"],
})
export class ProdutoComponent implements OnInit {
  @Input("produto")
  public produto: Produto = new Produto();

  public situacaoIndisponivel = SituacaoProdutoEnum.INDISPONIVEL;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public getNomeCategoria(categoria: number) {
    return ProdutoUtilsConstants.getNomeCategoria(categoria);
  }
  public getSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getCorSituacaoEstoque(situacao);
  }

  public irParaCarrinho() {
    this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
  }
}
