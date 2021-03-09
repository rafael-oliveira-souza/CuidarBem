import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cartao } from "src/app/shared/models/classes/Cartao";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";

@Component({
  selector: "app-home-produtos",
  templateUrl: "./home-produtos.component.html",
  styleUrls: ["./home-produtos.component.scss"],
})
export class HomeProdutosComponent implements OnInit {
  public situacaoDisponivel = SituacaoProdutoEnum.DISPONIVEL;
  public produtos: Array<Produto> = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.produtos = Mocks.Produtos;
  }

  public continuarComprando() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.PRODUTOS]);
  }
}
