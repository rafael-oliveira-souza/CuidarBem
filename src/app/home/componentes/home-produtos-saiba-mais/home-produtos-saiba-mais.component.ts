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
import { PacoteService } from "src/app/shared/servicos/pacote.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { ImagemProduto } from "src/app/shared/models/classes/ImagemProduto";
import { Imagem } from "src/app/shared/models/classes/Imagem";
import { FaixaEtariaService } from "src/app/shared/servicos/faixa-etaria.service";
import { FaixaEtaria } from "src/app/shared/models/classes/FaixaEtaria";

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

  public faixas: FaixaEtaria[] = [];
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
    private _faixaService: FaixaEtariaService,
    private _ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.pacotes = this._config.data.pacotes;
    this.produto = this._config.data.produto;
    this.categoria = this._config.data.categoria;
    this.objetoEnvio = this._config.data.objetoEnvio;

    this.pacotes.sort(function (a, b) {
      if (a.qtd_dias > b.qtd_dias) {
        return 1;
      }
      if (a.qtd_dias < b.qtd_dias) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    this.produtoIndisponivel =
      this.produto.situacao == SituacaoProdutoEnum.INDISPONIVEL;

    this.getImagens(this.produto.diretorioImagens);
    this.getFaixasEtarias();
  }

  public getImagens(diretorio: string) {
    this._fotoService
      .getImagensPorDiretorios(diretorio)
      .subscribe((imagens: Imagem[]) => {
        if (imagens.length > 0) {
          this.imagens = imagens.map((img) => `${img.diretorio}/${img.nome}`);
        } else {
          this.imagens = ["/assets/images/produtos/produtoSemImagem.png"];
        }
      });
  }

  public getFaixasEtarias() {
    return this._faixaService
      .getFaixasEtarias()
      .subscribe((faixas: FaixaEtaria[]) => {
        this.faixas = faixas;
      });
  }

  public getFaixa(faixa: number) {
    let faixaSelec = this.faixas.filter((faix) => faix.id == faixa);

    if (faixaSelec.length > 0) {
      return faixaSelec[0].nome;
    }

    return "";
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
