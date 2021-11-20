import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-principal",
  templateUrl: "./home-principal.component.html",
  styleUrls: ["./home-principal.component.scss"],
})
export class HomePrincipalComponent implements OnInit {
  public heightHeader: number = 0;

  constructor() {}

  ngOnInit() {
    let header = document.querySelector(".header");
    let headerAcoes = document.querySelector(".header-acoes");
    let headerMenu = document.querySelector(".header-menu");
    let headerBorda = document.querySelector(".header-borda");

    // this.heightHeader += header.clientHeight + header.scrollHeight;
    // this.heightHeader += headerAcoes.clientHeight + headerAcoes.scrollHeight;
    // this.heightHeader += headerMenu.clientHeight + headerMenu.scrollHeight;
    // this.heightHeader += headerBorda.clientHeight + headerBorda.scrollHeight;

    // this.heightHeader = header + headerMenu + headerBorda + "px";
    // const objetoEnvio: ObjetoEnvio = this._produtoService.instanciarObjetoEnvio();
  }
}
