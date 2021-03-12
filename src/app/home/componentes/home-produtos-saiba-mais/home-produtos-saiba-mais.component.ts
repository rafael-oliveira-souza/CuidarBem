import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Produto } from "src/app/shared/models/classes/Produto";
import { ProdutoUtilsConstants } from "src/app/shared/models/constantes/ProdutoUtilsConstante";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { FotoService } from "src/app/shared/servicos/foto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";

@Component({
  selector: "app-home-produtos-saiba-mais",
  templateUrl: "./home-produtos-saiba-mais.component.html",
  styleUrls: ["./home-produtos-saiba-mais.component.scss"],
})
export class HomeProdutosSaibaMaisComponent implements OnInit {
  @Input()
  public produto: Produto;

  @Input()
  public objetoEnvio: ObjetoEnvio;

  public imagens: any[] = [];
  public produtoIndisponivel: boolean = false;

  constructor(
    private _fotoService: FotoService,
    public _router: Router,
    public _config: DynamicDialogConfig,
    private _storageService: StorageService,
    private _alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.produto = this._config.data.produto;
    this.objetoEnvio = this._config.data.objetoEnvio;
    this.produtoIndisponivel =
      this.produto.situacao == SituacaoProdutoEnum.INDISPONIVEL;

    this._fotoService.getImagens().subscribe((imagens: any[]) => {
      this.imagens = imagens;
    });
  }

  public getSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return ProdutoUtilsConstants.getCorSituacaoEstoque(situacao);
  }

  public getNomeCategoria(categoria: number) {
    return ProdutoUtilsConstants.getNomeCategoria(categoria);
  }

  public continuarComprando(): void {
    debugger;
    if (!this.produtoIndisponivel) {
      let produtoNoCarrinho: boolean = false;
      this.objetoEnvio.produtos.forEach((prod) => {
        if (this.produto.id == prod.id) {
          produtoNoCarrinho = true;
        }
      });

      if (!produtoNoCarrinho) {
        this.produto.quantidade++;
        this.objetoEnvio.produtos.push(this.produto);

        this._storageService.setItem<ObjetoEnvio>(
          StorageEnum.OBJETO_ENVIO,
          this.objetoEnvio
        );
        return;
      }
      this._router.navigate([RotasEnum.CARRINHO]);
    } else {
      this._alertaService.alerta(MensagemEnum.PRODUTO_INDISPONIVEL);
    }
  }
}
