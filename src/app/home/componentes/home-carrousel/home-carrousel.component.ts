import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Imagem } from "src/app/shared/models/classes/Imagem";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { FotoService } from "src/app/shared/servicos/foto.service";

@Component({
  selector: "app-home-carrousel",
  templateUrl: "./home-carrousel.component.html",
  styleUrls: ["./home-carrousel.component.scss"],
})
export class HomeCarrouselComponent implements OnInit {
  public images: string[] = [];

  constructor(private _router: Router, private _fotoService: FotoService) {}

  ngOnInit(): void {
    this.images.push("/assets/images/carrousel/heitor.jpeg");
    this._fotoService.getImagensPorDiretorios("carrousel").subscribe((imgs) => {
      if (imgs.length > 0) {
        imgs.forEach((img: Imagem) => {
          this.images.push(`${img.diretorio}/${img.nome}`);
        });
      } else {
        this.images.push("/assets/images/paginainicialsite.png");
      }
    });
  }

  public getBgImage(img: string) {
    return `
      background-image: url(${img});
      width: 100%;
      height: 100vh;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
    `;
  }
}
