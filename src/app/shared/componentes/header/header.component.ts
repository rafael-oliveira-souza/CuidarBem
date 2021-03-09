import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RotasEnum } from "../../models/enums/RotasEnum";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input("exibeBarraAcao")
  public exibeBarraAcao: boolean = true;

  public items: { titulo: string; rota: string; selecionado: boolean }[] = [
    { titulo: "Produtos", rota: RotasEnum.PRODUTOS, selecionado: true },
    { titulo: "Quem Somos", rota: RotasEnum.QUEM_SOMOS, selecionado: false },
    { titulo: "Dúvidas", rota: RotasEnum.PRODUTOS, selecionado: false },
    { titulo: "Contato", rota: RotasEnum.PRODUTOS, selecionado: false },
  ];

  public selecionado: number = 0;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

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
}
