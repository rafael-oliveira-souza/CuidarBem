import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { LoginComponent } from "src/app/shared/componentes/login/login.component";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { Cliente } from "src/app/shared/models/classes/Cliente";
import { Email } from "src/app/shared/models/classes/Email";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Pagamento } from "src/app/shared/models/classes/Pagamento";
import { Pedido } from "src/app/shared/models/classes/Pedido";
import { PedidoMercadoPago } from "src/app/shared/models/classes/PedidoMercadoPago";
import { Produto } from "src/app/shared/models/classes/Produto";
import { Usuario } from "src/app/shared/models/classes/Usuario";
import { DataUtilsConstants } from "src/app/shared/models/constantes/DataUtilsConstante";
import { EnumUtilsConstants } from "src/app/shared/models/constantes/EnumUtilsConstante";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StatusPagamentoMercadoPagoEnum } from "src/app/shared/models/enums/StatusPagamentoMercadoPagoEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { MoedaPipe } from "src/app/shared/pipes/moeda.pipe";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { CategoriaService } from "src/app/shared/servicos/categoria.service";
import { EmailService } from "src/app/shared/servicos/email.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { PagamentoService } from "src/app/shared/servicos/pagamento.service";
import { PedidoService } from "src/app/shared/servicos/pedido.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";
import { UtilService } from "src/app/shared/servicos/util.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-compras-conclusao",
  templateUrl: "./compras-conclusao.component.html",
  styleUrls: ["./compras-conclusao.component.scss"],
})
export class ComprasConclusaoComponent implements OnInit {
  public objetoEnvio: ObjetoEnvio = new ObjetoEnvio();
  public valorPagamento: number = 0;
  public pacotes: Pacote[] = [];
  public urlMercadoPago: string;
  public altura: string;
  public mercadoOn = false;
  public pixOn = false;
  public dadosPix;
  public pedidos: Array<Pedido> = [];
  public categorias: Categoria[] = [];
  public moedaPipe = new MoedaPipe();
  public cliente: Cliente;
  public numeroPedido: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialogService: DialogService,
    private _alertaService: AlertaService,
    private _storageService: StorageService,
    private _pagamentoService: PagamentoService,
    private _locacaoService: LocacaoService,
    private _produtoService: ProdutoService,
    private _pedidoService: PedidoService,
    private _alerta: AlertaService,
    private _categoriaService: CategoriaService,
    private _emailService: EmailService,
    private _utils: UtilService
  ) {}

  ngOnInit(): void {
    this.cliente = this._storageService.getItem<Cliente>(StorageEnum.CLIENTE);
    this._route.queryParams.subscribe((params) => {
      let idPagamento = params["payment_id"];
      let statusPagamento = params["status"];
      if (idPagamento && statusPagamento) {
        if (statusPagamento == StatusPagamentoMercadoPagoEnum.APROVADO) {
          this._alertaService.sucesso(MensagemEnum.PAGAMENTO_APROVADO);
        } else if (
          statusPagamento == StatusPagamentoMercadoPagoEnum.EM_PROCESSO
        ) {
          this._alertaService.alerta(MensagemEnum.PAGAMENTO_PROCESSAMENTO);
        } else {
          this._alertaService.erro(MensagemEnum.PAGAMENTO_REJEITADO);
        }

        this._storageService.removeItem(StorageEnum.OBJETO_ENVIO);
        this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
        // this._pagamentoService.criarPagamento(pedido).subscribe(
      }
    });

    this.altura = window.screen.height * 0.78 + "px";
    this.carregarDadosPagamento();
    this.getCategorias();

    this.dadosPix = environment.pix;
    // this._utils.getDadosPix().subscribe((pix) => {
    //   this.dadosPix = JSON.parse(pix);
    // });
  }

  public goHome() {
    this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
  }

  public goCarrinho() {
    this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
  }

  public carregarDadosPagamento(): void {
    this.objetoEnvio = this._storageService.getItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO
    );

    if (this.objetoEnvio && this.objetoEnvio.produtos.length > 0) {
      this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
        this.pacotes = pacotes;
        this.valorPagamento = this._produtoService.getValorTotalProdutos(
          this.objetoEnvio.produtos,
          this.pacotes
        );
      });
    } else {
      this._alertaService.erro(MensagemEnum.CARRINHO_VAZIO);
      this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
    }
  }

  public criarPedidoMercadoPago() {
    this.pedidos = [];
    let pedido = new PedidoMercadoPago();
    let usuario = this._storageService.getItem<Usuario>(StorageEnum.USUARIO);
    let dataRef = new Date();

    if (this.cliente && usuario && this.valorPagamento > 0) {
      this.numeroPedido =
        this.cliente.nome.substring(0, 2).toUpperCase() +
        this.cliente.id +
        "DT" +
        dataRef.getTime();

      this.objetoEnvio.produtos.forEach((prod) => {
        let valor = this._produtoService.getValorTotalProdutos(
          [prod],
          this.pacotes
        );

        pedido.items.push({
          title: prod.id + "-" + prod.nome,
          description: prod.descricao,
          unit_price: valor,
          quantity: prod.quantidade,
        });

        let pedidoBd = new Pedido();
        pedidoBd.cliente = this.cliente.id;
        pedidoBd.data = dataRef;
        pedidoBd.produto = prod.id;
        pedidoBd.quantidade = prod.quantidade;
        pedidoBd.descricao = prod.descricao;
        pedidoBd.valor = valor;
        pedidoBd.numero = this.numeroPedido;
        this.pedidos.push(pedidoBd);
      });

      pedido.payer.email = usuario.email;
      pedido.payer.name = this.cliente.nome;
      pedido.payer.surname = this.cliente.sobrenome;

      let tel = this.cliente.telefone ? this.cliente.telefone : "";
      pedido.payer.phone.area_code = parseInt(tel.substring(0, 2));
      pedido.payer.phone.number = parseInt(tel.substring(2, tel.length));

      pedido.payer.address.zip_code = parseInt(this.cliente.cep);
      pedido.payer.address.street_name = this.cliente.logradouro;
      pedido.payer.address.street_number = this.cliente.numero;

      pedido.payer.identification.number = parseInt(this.cliente.cpf);
      pedido.payer.identification.type = "CPF";

      pedido.back_urls.success = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;
      pedido.back_urls.failure = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;
      pedido.back_urls.pending = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;

      pedido.payer.date_created = DataUtilsConstants.dataConvertDateToString(
        new Date()
      );

      this._pagamentoService.criarPedidoMecadoPago(pedido).subscribe(
        (resultado) => {
          this.urlMercadoPago = resultado["init_point"];
        },
        (erro) => {
          this._alertaService.erro(erro);
        }
      );
    } else {
      if (!usuario) {
        this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
        this._alertaService.erro(MensagemEnum.EFETUE_LOGIN, 2500);

        setTimeout(() => {
          const ref = this._dialogService.open(LoginComponent, {
            header: "",
            width: "70%",
          });
        }, 2500);

        // this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
      } else if (this.valorPagamento <= 0) {
        // this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
        this._alertaService.erro(MensagemEnum.VALOR_PAGAMENTO_INVALIDO);
      } else if (!this.cliente) {
        this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
        this._alertaService.erro(MensagemEnum.DADOS_CLIENTE_INVALIDO);
      }
    }
  }

  public criarPedido() {
    this.pedidos = [];
    let produtos = this.objetoEnvio.produtos;
    let dataRef = new Date();

    if (this.cliente && this.objetoEnvio && produtos.length > 0) {
      this.numeroPedido =
        this.cliente.nome.substring(0, 2).toUpperCase() +
        this.cliente.id +
        "DT" +
        dataRef.getTime();

      produtos.forEach((prod) => {
        let pedido = new Pedido();
        pedido.cliente = this.cliente.id;
        pedido.data = dataRef;
        pedido.produto = prod.id;
        pedido.quantidade = prod.quantidade;
        pedido.descricao = prod.descricao;
        pedido.numero = this.numeroPedido;

        pedido.valor = this._produtoService.getValorTotalProdutos(
          [prod],
          this.pacotes
        );
        this.pedidos.push(pedido);
      });
    }
  }

  public abrirPix() {
    this.mercadoOn = false;
    this.pixOn = true;
    this.criarPedido();
  }

  public abrirMercado() {
    this.mercadoOn = true;
    this.pixOn = false;
    this.criarPedidoMercadoPago();
    this.salvarPedido(false);
  }

  public salvarPedido(voltar: boolean) {
    if (this.pedidos.length > 0) {
      let pedidosSalvos = true;
      this.pedidos.forEach((pedido) => {
        this._pedidoService.salvarPedido(pedido).subscribe(
          (res) => {},
          (error) => {
            pedidosSalvos = false;
          }
        );
      });
      if (voltar) {
        if (pedidosSalvos) {
          this.enviarEmail();
          this._alerta.sucesso(MensagemEnum.PEDIDO_ENVIADO);
          this.goHome();
          this._storageService.setItem<ObjetoEnvio>(
            StorageEnum.OBJETO_ENVIO,
            new ObjetoEnvio()
          );
        } else {
          this._alerta.erro(MensagemEnum.PEDIDO_FALHOU);
        }
      } /**/
    } else {
      this._alerta.erro(MensagemEnum.PEDIDO_NAO_PROCESSADO);
    }
  }

  public enviarEmail() {
    let usuario = this._storageService.getItem<Usuario>(StorageEnum.USUARIO);

    if (usuario) {
      let email: Email = new Email();
      //email.usuario = environment.usuarioCrescerBem;
      //email.senha = environment.senhaCrescerBem;
      email.destinatarios = usuario.email;
      email.assunto = "Informações sobre o seu pedido";
      email.mensagem = document.getElementById("NotaFiscalCarrinho").outerHTML;

      this._emailService.enviarEmail(email).subscribe((res) => {
        this._alerta.alerta(
          `Enviamos uma mensagem no email <b>${usuario.email}</b> com as informações do seu pedido.`
        );
      });
    } else {
      this._alerta.erro(MensagemEnum.USUARIO_NAO_LOGADO);
    }
  }

  public getCategorias() {
    this._categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  public getValor(produto: Produto) {
    let valorTotal = this._produtoService.getValorTotalProdutos(
      [produto],
      this.pacotes
    );

    return this.moedaPipe.transform(valorTotal);
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

  public getValorTotal(produtos: Produto[], pacotes: Pacote[]) {
    return this._produtoService.getValorTotalProdutos(produtos, pacotes);
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
