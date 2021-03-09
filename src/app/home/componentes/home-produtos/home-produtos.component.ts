import { Component, OnInit } from "@angular/core";
import { Cartao } from "src/app/shared/models/classes/Cartao";
import { Mocks } from "src/app/shared/models/constantes/Mocks";

@Component({
  selector: "app-home-produtos",
  templateUrl: "./home-produtos.component.html",
  styleUrls: ["./home-produtos.component.scss"],
})
export class HomeProdutosComponent implements OnInit {
  public cartoes: Array<Cartao> = [];

  constructor() {}

  ngOnInit() {
    this.cartoes = Mocks.Cartoes;
  }
}
