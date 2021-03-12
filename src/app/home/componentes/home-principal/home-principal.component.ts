import { Component, OnInit } from "@angular/core";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { ProdutoService } from "src/app/shared/servicos/produto.service";

@Component({
  selector: "app-home-principal",
  templateUrl: "./home-principal.component.html",
  styleUrls: ["./home-principal.component.scss"],
})
export class HomePrincipalComponent implements OnInit {
  constructor(private _produtoService: ProdutoService) {}

  ngOnInit() {
    // const objetoEnvio: ObjetoEnvio = this._produtoService.instanciarObjetoEnvio();
  }
}
