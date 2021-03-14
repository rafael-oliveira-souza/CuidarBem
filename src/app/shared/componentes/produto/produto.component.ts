import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "../../models/classes/Produto";
import { SituacaoProdutoEnum } from "../../models/enums/SituacaoProdutoEnum";
import { ProdutoService } from "../../servicos/produto.service";

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

  constructor(
    private _router: Router,
    private _produtoService: ProdutoService
  ) {}

  ngOnInit(): void {}

  public getNomeCategoria(categoria: number) {
    return this._produtoService.getNomeCategoria(categoria);
  }
  public getSituacaoEstoque(situacao: number) {
    return this._produtoService.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return this._produtoService.getCorSituacaoEstoque(situacao);
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
