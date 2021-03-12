import { Component, OnInit } from "@angular/core";
import { FotoService } from "../../servicos/foto.service";

@Component({
  selector: "app-galeria",
  templateUrl: "./galeria.component.html",
  styleUrls: ["./galeria.component.scss"],
})
export class GaleriaComponent implements OnInit {
  public imagens: any[] = [];
  public exibeImagem: boolean = false;
  public indice: number = 0;
  public responsiveOptions: any[] = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  constructor(private _fotoService: FotoService) {}

  ngOnInit(): void {
    this._fotoService.getImagens().subscribe((images) => {
      this.imagens = images;
    });
  }

  public abrirImagem(index: number) {
    this.exibeImagem = !this.exibeImagem;
    this.indice = index;
    // if (this.exibeImagem) {
    // this.maxWidth = { "max-width": "50%" };
    // }
    // else {
    //   this.maxWidth = { "max-width": "20%" };
    // }
  }
}
