import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "../../models/classes/Categoria";
import { Imagem } from "../../models/classes/Imagem";
import { Produto } from "../../models/classes/Produto";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { SituacaoProdutoEnum } from "../../models/enums/SituacaoProdutoEnum";
import { AlertaService } from "../../servicos/alerta.service";
import { FotoService } from "../../servicos/foto.service";
import { ProdutoService } from "../../servicos/produto.service";

@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.scss"],
})
export class ProdutoComponent implements OnInit {
  @Input("produto")
  public produto: Produto = new Produto();

  @Input("categoria")
  public categoria: Categoria = new Categoria();

  @Output()
  public adicionarCarrinnho = new EventEmitter<Produto>();

  @Output()
  public irParaDetalhamento = new EventEmitter<{
    produto: Produto;
    categoria: Categoria;
  }>();

  public situacaoIndisponivel = SituacaoProdutoEnum.INDISPONIVEL;
  public imagem: string = null;

  constructor(
    private _router: Router,
    private _alertaService: AlertaService,
    private _produtoService: ProdutoService,
    private _fotoService: FotoService
  ) {}

  ngOnInit(): void {
    this.getImagem(this.produto.id);
  }

  public getImagem(idProduto: number) {
    this._fotoService.getImagensProdutosPorId(idProduto).subscribe((imgs) => {
      if (imgs.length > 0) {
        this.imagem = `${imgs[0].diretorio}/${imgs[0].nome}`;
      } else {
        this.imagem = "/assets/images/produtos/produtoSemImagem.png";
      }
    });
  }

  public getSituacaoEstoque(situacao: number) {
    return this._produtoService.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return this._produtoService.getCorSituacaoEstoque(situacao);
  }

  public addCarrinho() {
    if (this.produto.situacao == SituacaoProdutoEnum.INDISPONIVEL) {
      this._alertaService.alerta(MensagemEnum.PRODUTO_INDISPONIVEL);
      return;
    } else {
      this.adicionarCarrinnho.emit(this.produto);
    }
  }

  public goSaibaMais() {
    let detalhe = {
      produto: this.produto,
      categoria: this.categoria,
    };

    this.irParaDetalhamento.emit(detalhe);
    // this._router.navigate([
    //   RotasEnum.HOME,
    //   RotasEnum.PRODUTOS,
    //   RotasEnum.DESCRICAO,
    // ]);
  }
}
