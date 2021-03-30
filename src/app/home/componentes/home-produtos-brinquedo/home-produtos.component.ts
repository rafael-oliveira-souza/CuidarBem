import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Produto } from "src/app/shared/models/classes/Produto";
import { SituacaoProdutoEnum } from "src/app/shared/models/enums/SituacaoProdutoEnum";
import { CategoriaService } from "src/app/shared/servicos/categoria.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { HomeProdutosSaibaMaisComponent } from "../home-produtos-saiba-mais/home-produtos-saiba-mais.component";

@Component({
  selector: "app-home-produtos",
  templateUrl: "./home-produtos.component.html",
  styleUrls: ["./home-produtos.component.scss"],
})
export class HomeProdutosComponent implements OnInit {
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public situacaoDisponivel = SituacaoProdutoEnum.DISPONIVEL;
  public produtosFiltrados: Array<Produto> = [];
  public produtosBackup: Array<Produto> = [];
  public categorias: Array<Categoria> = [];
  public produtos: Array<Produto> = [];
  public pacotes: Array<Pacote> = [];

  public maxItems: number = 6;

  constructor(
    private _compraService: CompraService,
    private _produtoService: ProdutoService,
    private _locacaoService: LocacaoService,
    private _categoriaService: CategoriaService,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getProdutos();
    this.getCategorias();
    this.getPacotes();
  }

  public getProdutos() {
    this._produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtosBackup = produtos;
      this.produtos = produtos;
      this.carregarCarrinho();
    });
  }

  public getPacotes() {
    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
    });
  }

  public getCategorias() {
    this._categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  public getNomeCategoria(categoriaId: number) {
    let categoria: Categoria = new Categoria();

    this.categorias.forEach((cat: Categoria) => {
      if (cat.id == categoriaId) {
        categoria = cat;
      }
    });

    return categoria;
  }

  public carregarCarrinho(): void {
    this.objetoEnvio = this._compraService.carregarCarrinho();
  }

  public adicionarCarrinnho(produto: Produto): void {
    this._compraService.adicionarCarrinnho(this.objetoEnvio, produto);
  }

  public filtrarProdutos(produtos: Array<Produto>) {
    this.produtosFiltrados = produtos;
    this.paginar(0);
  }

  public paginar(valor: any) {
    let max: number =
      valor + this.maxItems > this.produtosFiltrados.length
        ? this.produtosFiltrados.length
        : valor + this.maxItems;
    this.produtos = this.produtosFiltrados.slice(valor, max);
  }

  public irParaDetalhamento(detalhe: {
    produto: Produto;
    categoria: Categoria;
  }) {
    const ref = this._dialogService.open(HomeProdutosSaibaMaisComponent, {
      // header: "Detalhamento de produto",
      width: "70%",
      data: {
        pacotes: this.pacotes,
        produto: detalhe.produto,
        categoria: detalhe.categoria,
        objetoEnvio: this.objetoEnvio,
      },
    });
  }
}
