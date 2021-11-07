import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { Imagem } from "./shared/models/classes/Imagem";
import { MensagemEnum } from "./shared/models/enums/MensagemEnum";
import { StorageEnum } from "./shared/models/enums/StorageEnum";
import { AlertaService } from "./shared/servicos/alerta.service";
import { FotoService } from "./shared/servicos/foto.service";
import { StorageService } from "./shared/servicos/storage.service";
import { UtilService } from "./shared/servicos/util.service";

declare var require: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "AppCuidarBem";
  linkWhatsapp = environment.whatsapp;
  showWhatsapp = false;

  constructor(
    private _router: Router,
    private _utils: UtilService,
    private _alerta: AlertaService,
    private _fotoService: FotoService,
    private _storageService: StorageService
  ) {
    this._router.events.subscribe((rout: any) => {
      if (
        window.location.href.includes("home") &&
        !window.location.href.includes("admin")
      ) {
        this.showWhatsapp = true;
      } else {
        this.showWhatsapp = false;
      }
    });
  }

  ngOnInit(): void {
    this.limparCache();
    this.carregarImagens();
    this.carregarWhatsapp();
  }

  public abrirWhatsapp() {
    window.open(this.linkWhatsapp, "_blank");
  }

  public carregarImagens() {
    this._fotoService.getImagens().subscribe((imagens: Imagem[]) => {
      this._storageService.setItem<Imagem[]>(StorageEnum.IMAGENS, imagens);
    });
  }

  public carregarWhatsapp() {
    this._utils.getLinkWhatsapp().subscribe((whatsapp) => {
      this.linkWhatsapp = whatsapp.link;
    });
  }

  public limparCache() {
    //limpa os dados dos produtos a cada 30 min
    setInterval(this.limparCacheProdutos, 1800000);

    //limpa os dados dos produtos a cada 130 min
    setInterval(this.limparCacheDadosUsuario, 5400000);
  }

  public limparCacheProdutos() {
    this._storageService.removeItem(StorageEnum.IMAGENS);
    this._storageService.removeItem(StorageEnum.CATEGORIAS);
    this._storageService.removeItem(StorageEnum.PRODUTOS);
    this._storageService.removeItem(StorageEnum.PACOTES);
    this._storageService.removeItem(StorageEnum.FAIXAS);
  }

  public limparCacheDadosUsuario() {
    this._storageService.removeItem(StorageEnum.OBJETO_ENVIO);
    this._storageService.removeItem(StorageEnum.USUARIO);
    this._storageService.removeItem(StorageEnum.CLIENTE);

    this._alerta.alerta(MensagemEnum.SESSAO_ENCERRADA);
  }
}
