import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "../../models/classes/Produto";
import { ProdutoUtilsConstants } from "../../models/constantes/ProdutoUtilsConstante";
import { SituacaoProdutoEnum } from "../../models/enums/SituacaoProdutoEnum";

@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.scss"],
})
export class ProdutoComponent implements OnInit {
  @Input("produto")
  public produto: Produto = new Produto();

  @Output()
  public adicionarCarrinnho = new EventEmitter<Produto>();

  @Output()
  public irParaDetalhamento = new EventEmitter<Produto>();

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

  public addCarrinho() {
    this.adicionarCarrinnho.emit(this.produto);
  }

  public goSaibaMais() {
    this.irParaDetalhamento.emit(this.produto);
    // this._router.navigate([
    //   RotasEnum.HOME,
    //   RotasEnum.PRODUTOS,
    //   RotasEnum.DESCRICAO,
    // ]);
  }
}
