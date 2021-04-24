import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { LoginComponent } from "src/app/shared/componentes/login/login.component";
import { Cliente } from "src/app/shared/models/classes/Cliente";
import { ObjetoEnvio } from "src/app/shared/models/classes/ObjetoEnvio";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Pagamento } from "src/app/shared/models/classes/Pagamento";
import { Pedido } from "src/app/shared/models/classes/Pedido";
import { Usuario } from "src/app/shared/models/classes/Usuario";
import { DataUtilsConstants } from "src/app/shared/models/constantes/DataUtilsConstante";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { StatusPagamentoEnum } from "src/app/shared/models/enums/StatusPagamentoEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import { AlertaService } from "src/app/shared/servicos/alerta.service";
import { LocacaoService } from "src/app/shared/servicos/locacao.service";
import { PagamentoService } from "src/app/shared/servicos/pagamento.service";
import { ProdutoService } from "src/app/shared/servicos/produto.service";
import { StorageService } from "src/app/shared/servicos/storage.service";
import { environment } from "src/environments/environment";

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialogService: DialogService,
    private _alertaService: AlertaService,
    private _storageService: StorageService,
    private _pagamentoService: PagamentoService,
    private _locacaoService: LocacaoService,
    private _produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      let idPagamento = params["payment_id"];
      let statusPagamento = params["status"];
      if (idPagamento && statusPagamento) {
        if (statusPagamento == StatusPagamentoEnum.APROVADO) {
          this._alertaService.sucesso(MensagemEnum.PAGAMENTO_APROVADO);
        } else if (statusPagamento == StatusPagamentoEnum.EM_PROCESSO) {
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
        this.criarPedido();
      });
    } else {
      this._alertaService.erro(MensagemEnum.CARRINHO_VAZIO);
      this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
    }
  }

  public criarPedido() {
    let pedido = new Pedido();
    let usuario = this._storageService.getItem<Usuario>(StorageEnum.USUARIO);
    let cliente = this._storageService.getItem<Cliente>(StorageEnum.CLIENTE);

    if (cliente && usuario && this.valorPagamento > 0) {
      this.objetoEnvio.produtos.forEach((prod) => {
        pedido.items.push({
          title: prod.id + "-" + prod.nome,
          description: prod.descricao,
          unit_price: this._produtoService.getValorTotalProdutos(
            [prod],
            this.pacotes
          ),
          quantity: prod.quantidade,
        });
      });

      pedido.payer.email = usuario.email;
      pedido.payer.name = cliente.nome;
      pedido.payer.surname = cliente.sobrenome;

      let tel = cliente.telefone ? cliente.telefone : "";
      pedido.payer.phone.area_code = parseInt(tel.substring(0, 2));
      pedido.payer.phone.number = parseInt(tel.substring(2, tel.length));

      pedido.payer.address.zip_code = parseInt(cliente.cep);
      pedido.payer.address.street_name = cliente.logradouro;
      pedido.payer.address.street_number = cliente.numero;

      pedido.payer.identification.number = parseInt(cliente.cpf);
      pedido.payer.identification.type = "CPF";

      pedido.back_urls.success = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;
      pedido.back_urls.failure = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;
      pedido.back_urls.pending = `${environment.apiCrescerBemServer}/${RotasEnum.COMPRAS}/${RotasEnum.CONCLUSAO}`;

      pedido.payer.date_created = DataUtilsConstants.dataConvertDateToString(
        new Date()
      );

      this._pagamentoService.criarPedido(pedido).subscribe(
        (resultado) => {
          console.log(resultado);
          this.urlMercadoPago = resultado["init_point"];
        },
        (erro) => {
          this._alertaService.erro(erro);
        }
      );
    } else {
      if (!usuario) {
        this._alertaService.erro(MensagemEnum.EFETUE_LOGIN);
        const ref = this._dialogService.open(LoginComponent, {
          header: "",
          width: "70%",
        });
        // this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
      } else if (this.valorPagamento <= 0) {
        // this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
        this._alertaService.erro(MensagemEnum.VALOR_PAGAMENTO_INVALIDO);
      } else if (!cliente) {
        this._router.navigate([RotasEnum.HOME, RotasEnum.LOJA]);
        this._alertaService.erro(MensagemEnum.DADOS_CLIENTE_INVALIDO);
      }
    }
  }
}
