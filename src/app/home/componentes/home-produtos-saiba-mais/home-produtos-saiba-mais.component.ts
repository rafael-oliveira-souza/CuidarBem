import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Produto } from "src/app/shared/models/classes/Produto";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { FotoService } from "src/app/shared/servicos/foto.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { ImagemProduto } from "src/app/shared/models/classes/ImagemProduto";
import { Imagem } from "src/app/shared/models/classes/Imagem";

@Component({
  selector: "app-home-produtos-saiba-mais",
  templateUrl: "./home-produtos-saiba-mais.component.html",
  styleUrls: ["./home-produtos-saiba-mais.component.scss"],
})
export class HomeProdutosSaibaMaisComponent implements OnInit {
  @Input("produto")
  public produto: Produto;

  @Input("categoria")
  public categoria: Categoria;

  @Input("objetoEnvio")
  public objetoEnvio: ObjetoEnvio;

  public imagens: any[] = [];
  public produtoIndisponivel: boolean = false;
  public pacotes: Pacote[] = [];

  constructor(
    public _router: Router,
    public _config: DynamicDialogConfig,
    private _produtoService: ProdutoService,
    private _fotoService: FotoService,
    private _alertaService: AlertaService,
    private _compraService: CompraService,
    private _ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.pacotes = this._config.data.pacotes;
    this.produto = this._config.data.produto;
    this.categoria = this._config.data.categoria;
    this.objetoEnvio = this._config.data.objetoEnvio;

    this.produtoIndisponivel =
      this.produto.situacao == SituacaoProdutoEnum.INDISPONIVEL;

    this.getImagens(this.produto.id);
  }

  public getImagens(idProduto: number) {
    this._fotoService
      .getImagensProdutosPorId(idProduto)
      .subscribe((imagens: Imagem[]) => {
        this.imagens = imagens.map((img) => `${img.diretorio}/${img.nome}`);
      });
  }

  public getSituacaoEstoque(situacao: number) {
    return this._produtoService.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return this._produtoService.getCorSituacaoEstoque(situacao);
  }

  public getValor(): number {
    return this._produtoService.getValorTotalProdutos(
      [this.produto],
      this.pacotes
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
