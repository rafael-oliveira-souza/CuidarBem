import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "../../models/classes/Usuario";
import { DataUtilsConstants } from "../../models/constantes/DataUtilsConstante";
import { PerfilEnum } from "../../models/enums/PerfilEnum";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { StorageEnum } from "../../models/enums/StorageEnum";
import { HeaderService } from "../../servicos/header.service";
import { StorageService } from "../../servicos/storage.service";

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
    private _storageService: StorageService,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.validarCache();
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

  validarCache() {
    let self = this;
    //verifica o perfil a cada 1 segundos.
    setInterval(function () {
      let resultado: any = self._storageService.getItem<Usuario>(
        StorageEnum.USUARIO
      );
      let usuario: any = resultado;

      if (resultado && resultado["dataCriacao"]) {
        let dataCriacao: Date = new Date(resultado["dataCriacao"]);

        let dataRef: Date = new Date();
        let diffHoras = DataUtilsConstants.diff(
          dataRef,
          dataCriacao,
          "minutes"
        );

        //reseta o cache a cada duas horas.
        if (diffHoras >= 120) {
          self._storageService.removeAll();
        }

        // self.verificarPerfil(usuario);
      }
    }, 1000);
  }

  verificarPerfil(usuario: Usuario) {
    if (usuario && usuario.perfil == PerfilEnum.ADMIN) {
      let btnAdmin = this.items.filter((item) => item.titulo == "Admin");
      if (!btnAdmin || btnAdmin.length <= 0) {
        this.items.push({
          titulo: "Admin",
          rota: RotasEnum.ADMIN,
          selecionado: false,
        });
      }
    }
  }
}
