import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Produto } from "src/app/shared/models/classes/Produto";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { FotoService } from "src/app/shared/servicos/foto.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";
import { CompraService } from "src/app/shared/servicos/compra.service";

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
  public pacotes: Pacote[] = [];

  constructor(
    private _fotoService: FotoService,
    public _router: Router,
    public _config: DynamicDialogConfig,
    private _storageService: StorageService,
    private _produtoService: ProdutoService,
    private _locacaoService: LocacaoService,
    private _alertaService: AlertaService,
    private _compraService: CompraService,
    private _ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.produto = this._config.data.produto;
    this.objetoEnvio = this._config.data.objetoEnvio;
    this.produtoIndisponivel =
      this.produto.situacao == SituacaoProdutoEnum.INDISPONIVEL;
    this.getImagens();
    this.getPacotes();
  }

  public getImagens() {
    this._fotoService.getImagens().subscribe((imagens: any[]) => {
      this.imagens = imagens;
    });
  }

  public getPacotes() {
    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
    });
  }

  public getSituacaoEstoque(situacao: number) {
    return this._produtoService.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return this._produtoService.getCorSituacaoEstoque(situacao);
  }

  public getNomeCategoria(categoria: number) {
    return this._produtoService.getNomeCategoria(categoria);
  }

  public getValor(): number {
    return (
      this.produto.valor * this._produtoService.getValorPacote(this.produto)
    );
  }

  public continuarComprando(): void {
    if (!this.produtoIndisponivel) {
      this._compraService.adicionarCarrinnho(this.objetoEnvio, this.produto);
      this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
      this._ref.close();
    } else {
      this._alertaService.alerta(MensagemEnum.PRODUTO_INDISPONIVEL);
    }
  }
}
