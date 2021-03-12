import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { HeaderService } from "../../servicos/header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input("exibeBarraAcao")
  public exibeBarraAcao: boolean = true;

  public items: { titulo: string; rota: string; selecionado: boolean }[] = [
    { titulo: "Loja", rota: RotasEnum.LOJA, selecionado: true },
    { titulo: "Promoções", rota: RotasEnum.PROMOCOES, selecionado: false },
    { titulo: "Novidades", rota: RotasEnum.NOVIDADES, selecionado: false },
    { titulo: "Quem Somos", rota: RotasEnum.QUEM_SOMOS, selecionado: false },
    { titulo: "Contato", rota: RotasEnum.CONTATO, selecionado: false },
  ];

  public selecionado: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.items.forEach(
      (item: { titulo: string; rota: string; selecionado: boolean }) => {
        if (this._router.url.includes(item.rota)) {
          this.navegar(item);
        }
      }
    );
  }

  navegar(item: { titulo: string; rota: string; selecionado: boolean }) {
    this.items.map((item) => (item.selecionado = false));

    item.selecionado = true;
    this._router.navigate([item.rota], {
      relativeTo: this._route,
    });
  }

  setValorPesquisa(valorPesquisa = "") {
    this._headerService.setValorPesquisa(valorPesquisa);
  }
}
