import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";

@Component({
  selector: "app-home-loja",
  templateUrl: "./home-loja.component.html",
  styleUrls: ["./home-loja.component.scss"],
})
export class HomeLojaComponent implements OnInit {
  public images: string[] = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.images.push("/assets/images/bg_img1.jpeg");
    this.images.push("/assets/images/bg_img2.jpeg");
  }

  public goRota(rota: string) {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA, rota]);
  }

  public getBgImage(img: string) {
    return `
      background-image: url(${img});
      width: 100%;
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
    `;
  }
}
