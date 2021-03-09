import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
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

  public continuarComprando() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.PRODUTOS]);
  }

  public finalizarCompra() {}
}
