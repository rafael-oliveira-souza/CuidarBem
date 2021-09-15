import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { Cliente } from "src/app/shared/models/classes/Cliente";
import { Imagem } from "src/app/shared/models/classes/Imagem";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Produto } from "src/app/shared/models/classes/Produto";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { MoedaPipe } from "src/app/shared/pipes/moeda.pipe";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { CategoriaService } from "src/app/shared/servicos/categoria.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { FotoService } from "src/app/shared/servicos/foto.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { PdfService } from "src/app/shared/servicos/pdf.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.component.html",
  styleUrls: ["./carrinho.component.scss"],
})
export class CarrinhoComponent implements OnInit {
  public moedaPipe = new MoedaPipe();
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public categorias: Categoria[] = [];
  public pacotes: Pacote[] = [];
  public imagens: Imagem[] = [];
  public cliente: Cliente;
  public numeroPedido: number;

  constructor(
    private _router: Router,
    private _alertaService: AlertaService,
    private _produtoService: ProdutoService,
    private _categoriaService: CategoriaService,
    private _compraService: CompraService,
    private _locacaoService: LocacaoService,
    private _fotoService: FotoService,
    private _pdfService: PdfService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    // this.produtos = Mocks.Produtos;
    this.cliente = this._storageService.getItem<Cliente>(StorageEnum.CLIENTE);
    this.carregarCarrinho();
    if (this.objetoEnvio) {
      this.getPacotes();
      this.getCategorias();
      this.carregarImagens();
    } else {
      this.objetoEnvio = new ObjetoEnvio();
    }
  }

  public carregarCarrinho(): void {
    this.objetoEnvio = this._compraService.carregarCarrinho();
  }

  public carregarImagens(): void {
    this._fotoService.getImagensPorDiretorios("produtos").subscribe((imgs) => {
      this.imagens = imgs;
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

    return categoria.nome;
  }

  public getPacotes() {
    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
      // this.getValorTotal(this.objetoEnvio.produtos, pacotes);
    });
  }

  public getValor(produto: Produto) {
    this._compraService.salvarCarrinho(this.objetoEnvio);
    let valorTotal = this._produtoService.getValorTotalProdutos(
      [produto],
      this.pacotes
    );

    return this.moedaPipe.transform(valorTotal);
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

  public getValorTotal(produtos: Produto[], pacotes: Pacote[]) {
    return this._produtoService.getValorTotalProdutos(produtos, pacotes);
  }

  public atualizarQuantidade(value: number, produto: Produto) {
    if (value) {
      produto.quantidade = value > produto.estoque ? produto.estoque : value;
    }

    this._compraService.salvarCarrinho(this.objetoEnvio);
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
    if (this.getValorTotal(this.objetoEnvio.produtos, this.pacotes) <= 0) {
      this._alertaService.alerta(MensagemEnum.CARRINHO_VAZIO);
      // this._alertaService.alerta(MensagemEnum.COMPRA_SEM_QUANTIDADE_ITEMS);
    } else {
      if (
        this.cliente &&
        this.cliente.nome &&
        this.cliente.sobrenome &&
        this.cliente.cpf &&
        this.cliente.telefone &&
        this.cliente.cep &&
        this.cliente.logradouro &&
        this.cliente.municipio &&
        this.cliente.estado
      ) {
        let nota = document.getElementById("NotaFiscalCarrinho");
        this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CONCLUSAO]);
      } else {
        this._alertaService.alerta(MensagemEnum.ATUALIZACAO_PERFIL);
      }
    }
  }

  public definirAltura() {
    return window.screen.height * 0.6 + `px`;
  }

  public getImage(idProduto: number) {
    let imgs: Imagem[] = this.imagens.filter((img) => img.id == idProduto);
    if (imgs.length > 0) {
      let urls = imgs.map((img) => `${imgs[0].diretorio}/${imgs[0].nome}`);
      return urls;
    } else {
      return ["/assets/images/produtos/produtoSemImagem.png"];
    }
  }

  public formatarTelefone(tel: string) {
    if (tel) {
      return tel
        .replace(/(\d{2})?(\d{4,5})?(\d{4})/, "($1) $2-$3")
        .substring(0, 15);
    }
  }

  public formatarEndereco(cliente: Cliente) {
    return `${cliente.logradouro} - Numero: ${cliente.numero} - ${cliente.complemento} - ${cliente.municipio} - ${cliente.estado} -  CEP: ${cliente.cep}`;
  }
}
