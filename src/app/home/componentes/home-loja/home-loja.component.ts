import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Imagem } from "src/app/shared/models/classes/Imagem";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { FotoService } from "src/app/shared/servicos/foto.service";

@Component({
  selector: "app-home-loja",
  templateUrl: "./home-loja.component.html",
  styleUrls: ["./home-loja.component.scss"],
})
export class HomeLojaComponent implements OnInit {
  public images: string[] = [];

  constructor(private _router: Router, private _fotoService: FotoService) {}

  ngOnInit(): void {
    this._fotoService.getImagensPorDiretorios("carrousel").subscribe((imgs) => {
      imgs.forEach((img: Imagem) => {
        this.images.push(`${img.diretorio}/${img.nome}`);
      });
    });
  }

  public goRota(rota: string) {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA, rota]);
  }

  public getBgImage(img: string) {
    return `
      background-image: url(${img});
      background-position: center center;
      width: 100%;
      height: 75vh;
      background-repeat: no-repeat;
      background-size: cover;
    `;
  }
}
