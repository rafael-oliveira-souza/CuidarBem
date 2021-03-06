import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RotasEnum } from "../../models/enums/RotasEnum";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public items: { titulo: string; rota: string }[] = [
    { titulo: "Produtos", rota: RotasEnum.PRODUTOS },
    { titulo: "Quem Somos", rota: RotasEnum.QUEM_SOMOS },
    { titulo: "Dúvidas", rota: RotasEnum.PRODUTOS },
    { titulo: "Contato", rota: RotasEnum.PRODUTOS },
  ];

  public selecionado: number = 0;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.items.forEach(
    //   (item: { titulo: string; rota: string }, indice: number) => {
    //     if (this._router.url.includes(item.rota)) {
    //       this.selecionado = indice;
    //     }
    //   }
    // );
    // this.navegar(this.selecionado);
  }

  navegar(rota: string, element: any) {
    this._router.navigate([rota], {
      relativeTo: this._route,
    });
  }
}
