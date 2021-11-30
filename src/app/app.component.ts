import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { Cliente } from "./shared/models/classes/Cliente";
import { Imagem } from "./shared/models/classes/Imagem";
import { ObjetoEnvio } from "./shared/models/classes/ObjetoEnvio";
import { Usuario } from "./shared/models/classes/Usuario";
import { MensagemEnum } from "./shared/models/enums/MensagemEnum";
import { StorageEnum } from "./shared/models/enums/StorageEnum";
import { AlertaService } from "./shared/servicos/alerta.service";
import { FotoService } from "./shared/servicos/foto.service";
import { StorageService } from "./shared/servicos/storage.service";
import { UtilService } from "./shared/servicos/util.service";
import * as moment from "moment";
import { StorageUtilsConstante } from "./shared/models/constantes/StorageUtilsConstante";
import { DataUtilsConstants } from "./shared/models/constantes/DataUtilsConstante";

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
    private _fotoService: FotoService
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
      StorageUtilsConstante.setItem<Imagem[]>(StorageEnum.IMAGENS, imagens);
    });
  }

  public carregarWhatsapp() {
    this._utils.getLinkWhatsapp().subscribe((whatsapp) => {
      this.linkWhatsapp = whatsapp.link;
    });
  }

  public limparCache() {
    let objetoEnvio: ObjetoEnvio = StorageUtilsConstante.getItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO
    );

    if (
      objetoEnvio != null &&
      DataUtilsConstants.diff(objetoEnvio.dataCriacao, new Date(), "hours") > 2
    ) {
      this.limparLixo();
      this.limparCacheProdutos();
      this.limparCacheDadosUsuario();
    }

    setInterval(this.limparLixo, 3000);

    //limpa os dados dos produtos a cada 30 min
    setInterval(this.limparCacheProdutos, 3000);

    //limpa os dados dos produtos a cada 130 min
    setInterval(this.limparCacheDadosUsuario, 5400000);
  }

  public limparLixo() {
    let user: Usuario = StorageUtilsConstante.getItem<Usuario>(
      StorageEnum.USUARIO
    );
    let cliente: Cliente = StorageUtilsConstante.getItem<Cliente>(
      StorageEnum.CLIENTE
    );
    let objetoEnvio: ObjetoEnvio = StorageUtilsConstante.getItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO
    );

    if (user && !cliente) {
      StorageUtilsConstante.removeItem(StorageEnum.OBJETO_ENVIO);
      StorageUtilsConstante.removeItem(StorageEnum.USUARIO);
      StorageUtilsConstante.removeItem(StorageEnum.CLIENTE);
    } else if (cliente && !user) {
      StorageUtilsConstante.removeItem(StorageEnum.OBJETO_ENVIO);
      StorageUtilsConstante.removeItem(StorageEnum.USUARIO);
      StorageUtilsConstante.removeItem(StorageEnum.CLIENTE);
    } else if (objetoEnvio && (!user || !cliente)) {
      StorageUtilsConstante.removeItem(StorageEnum.OBJETO_ENVIO);
      StorageUtilsConstante.removeItem(StorageEnum.USUARIO);
      StorageUtilsConstante.removeItem(StorageEnum.CLIENTE);
    } else if (objetoEnvio) {
      let now = moment(new Date());
      let diffHours = now.diff(objetoEnvio.dataCriacao, "minutes");
      if (diffHours > 120) {
        StorageUtilsConstante.removeItem(StorageEnum.OBJETO_ENVIO);
        StorageUtilsConstante.removeItem(StorageEnum.USUARIO);
        StorageUtilsConstante.removeItem(StorageEnum.CLIENTE);
      }
    }
  }

  public limparCacheProdutos() {
    StorageUtilsConstante.removeItem(StorageEnum.IMAGENS);
    StorageUtilsConstante.removeItem(StorageEnum.CATEGORIAS);
    StorageUtilsConstante.removeItem(StorageEnum.PRODUTOS);
    StorageUtilsConstante.removeItem(StorageEnum.PACOTES);
    StorageUtilsConstante.removeItem(StorageEnum.FAIXAS);
  }

  public limparCacheDadosUsuario() {
    StorageUtilsConstante.removeItem(StorageEnum.OBJETO_ENVIO);
    StorageUtilsConstante.removeItem(StorageEnum.USUARIO);
    StorageUtilsConstante.removeItem(StorageEnum.CLIENTE);

    this._alerta.alerta(MensagemEnum.SESSAO_ENCERRADA);
  }
}
