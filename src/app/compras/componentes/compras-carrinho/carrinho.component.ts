import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Produto } from "src/app/shared/models/classes/Produto";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { MoedaPipe } from "src/app/shared/pipes/moeda.pipe";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.component.html",
  styleUrls: ["./carrinho.component.scss"],
})
export class CarrinhoComponent implements OnInit {
  public moedaPipe = new MoedaPipe();
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public pacotes: Pacote[] = [];

  constructor(
    private _router: Router,
    private _alertaService: AlertaService,
    private _produtoService: ProdutoService,
    private _compraService: CompraService,
    private _locacaoService: LocacaoService
  ) {}

  ngOnInit(): void {
    // this.produtos = Mocks.Produtos;
    this.carregarCarrinho();
  }

  public carregarCarrinho(): void {
    this._compraService
      .carregarCarrinho()
      .subscribe((objEnvio: ObjetoEnvio) => {
        if (objEnvio != null) {
          this.objetoEnvio = objEnvio;
          this.getValorTotal();
          this.getPacotes();
        }
      });
  }

  public getPacotes() {
    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
    });
  }

  public getValor(produto: Produto) {
    this._compraService.salvarCarrinho(this.objetoEnvio);

    return this.moedaPipe.transform(
      produto.valor *
        produto.quantidade *
        this._produtoService.getValorPacote(produto)
    );
  }

  public verificarSeRemove(produto: Produto) {
    this._alertaService.ativarModalConfirmacao(
      MensagemEnum.DESEJO_REMOVER_ITEM,
      true,
      this.removerItem.bind(this, produto)
    );
    // this._alertaService.alerta(MensagemEnum.DESEJO_REMOVER_ITEM);
  }

  public removerItem(produto: Produto) {
    this._compraService.removerProdutoCarrinho(this.objetoEnvio, produto);
  }

  public getValorTotal() {
    return this._produtoService.getValorTotalProdutos(
      this.objetoEnvio.produtos
    );
  }

  public atualizarQuantidade(value: number, produto: Produto) {
    if (value) {
      produto.quantidade = value > produto.estoque ? produto.estoque : value;
    }

    this._compraService.salvarCarrinho(this.objetoEnvio);
  }

  public getNomeCategoria(categoria: number) {
    return this._produtoService.getNomeCategoria(categoria);
  }
  public getSituacaoEstoque(situacao: number) {
    return this._produtoService.getSituacaoEstoque(situacao);
  }
  public getCorSituacaoEstoque(situacao: number) {
    return this._produtoService.getCorSituacaoEstoque(situacao);
  }

  public continuarComprando() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
  }

  public finalizarCompra() {
    if (this.getValorTotal() <= 0) {
      this._alertaService.alerta(MensagemEnum.COMPRA_SEM_QUANTIDADE_ITEMS);
    } else {
      this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CONCLUSAO]);
    }
  }
}
