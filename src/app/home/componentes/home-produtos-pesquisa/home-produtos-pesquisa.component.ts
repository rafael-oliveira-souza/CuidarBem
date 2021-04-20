import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { FaixaEtaria } from "src/app/shared/models/classes/FaixaEtaria";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Mocks } from "src/app/shared/models/constantes/Mocks";
import { CategoriaService } from "src/app/shared/servicos/categoria.service";
import { FaixaEtariaService } from "src/app/shared/servicos/faixa-etaria.service";
import { HeaderService } from "src/app/shared/servicos/header.service";

@Component({
  selector: "app-home-produtos-pesquisa",
  templateUrl: "./home-produtos-pesquisa.component.html",
  styleUrls: ["./home-produtos-pesquisa.component.scss"],
})
export class HomeProdutosPesquisaComponent implements OnInit {
  @Input("produtos")
  public produtosBackup: Array<Produto> = [];

  @Output()
  public filtroProdutos = new EventEmitter<Array<Produto>>();

  public produtos: Array<Produto> = [];
  public categorias: Array<Categoria> = [];
  public faixas: Array<FaixaEtaria> = [];

  public categoriasSelecionadas: number[] = [];
  public faixasSelecionadas: number[] = [];
  public faixaValores: number[] = [0, 500];

  public collapsed: boolean = false;

  constructor(
    private _headerService: HeaderService,
    private _categoriaService: CategoriaService,
    private _faixaService: FaixaEtariaService,
    private _el: ElementRef
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtosBackup;

    this._categoriaService
      .getCategorias()
      .subscribe((categorias: Produto[]) => {
        this.categorias = categorias;
      });

    this._faixaService
      .getFaixasEtarias()
      .subscribe((faixasEtarias: Produto[]) => {
        this.faixas = faixasEtarias;
      });

    this.filtrarProdutos();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    // if (this.produtosBackup.length > 0) {
    //   let valMaxProduto = this.produtosBackup
    //     .map((prod) => prod.valor)
    //     .sort()[0];

    //   this.faixaValores[1] = valMaxProduto + 30;
    // }

    if (window.screen.width < 500) {
      this.collapsed = true;
    }
  }

  public filtrarProdutos(valorPesquisa?: string) {
    // this._headerService
    //   .getValorPesquisa()
    //   .subscribe((valorPesquisa: string) => {
    //     this.produtos = this.produtosBackup.filter(
    //       (prod) =>
    //         prod.nome.includes(valorPesquisa) ||
    //         prod.descricao.includes(valorPesquisa)
    //     );
    //   });

    if (valorPesquisa) {
      this.produtos = this.produtosBackup.filter(
        (prod) =>
          prod.nome.toLowerCase().includes(valorPesquisa.toLowerCase()) ||
          prod.descricao.toLowerCase().includes(valorPesquisa.toLowerCase())
      );
    } else {
      this.produtos = this.produtosBackup;
    }

    this.filtroProdutos.emit(this.produtos);
  }

  public filtrarPorPreco() {
    event.preventDefault();
    this.produtos = this.produtosBackup.filter(
      (prod) =>
        prod.valor >= this.faixaValores[0] && prod.valor <= this.faixaValores[1]
    );

    this.filtroProdutos.emit(this.produtos);
  }

  public filtrarPorCategoria() {
    event.preventDefault();

    if (this.categoriasSelecionadas.length > 0) {
      this.produtos = this.produtosBackup.filter((prod) =>
        this.categoriasSelecionadas.includes(prod.categoria)
      );
    } else {
      this.produtos = this.produtosBackup;
    }

    this.filtroProdutos.emit(this.produtos);
  }

  public filtrarPorFaixaEtaria() {
    event.preventDefault();

    if (this.faixasSelecionadas.length > 0) {
      this.produtos = this.produtosBackup.filter((prod) =>
        this.faixasSelecionadas.includes(prod.faixa_etaria)
      );
    } else {
      this.produtos = this.produtosBackup;
    }
    this.filtroProdutos.emit(this.produtos);
  }
}
