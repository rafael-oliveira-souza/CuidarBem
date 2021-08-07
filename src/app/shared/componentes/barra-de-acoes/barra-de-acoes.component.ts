import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { HomeMinhaContaComponent } from "src/app/home/componentes/home-minha-conta/home-minha-conta.component";
import { Cliente } from "../../models/classes/Cliente";
import { ObjetoEnvio } from "../../models/classes/ObjetoEnvio";
import { Pacote } from "../../models/classes/Pacote";
import { Produto } from "../../models/classes/Produto";
import { Usuario } from "../../models/classes/Usuario";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { RotasEnum } from "../../models/enums/RotasEnum";
import { StorageEnum } from "../../models/enums/StorageEnum";
import { MoedaPipe } from "../../pipes/moeda.pipe";
import { AlertaService } from "../../servicos/alerta.service";
import { CompraService } from "../../servicos/compra.service";
import { LoadService } from "../../servicos/load.service";
import { LocacaoService } from "../../servicos/locacao.service";
import { ProdutoService } from "../../servicos/produto.service";
import { StorageService } from "../../servicos/storage.service";
import { UsuarioService } from "../../servicos/usuario.service";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-barra-de-acoes",
  templateUrl: "./barra-de-acoes.component.html",
  styleUrls: ["./barra-de-acoes.component.scss"],
})
export class BarraDeAcoesComponent implements OnInit {
  public usuarioLogado: Boolean = true;
  public moedaPipe: MoedaPipe = new MoedaPipe();
  public labelCarrinho: string = `Carrinho: 0 Itens - R$ 0,00`;
  public labelEntrar: string = "Entrar";
  public pacotes: Pacote[] = [];
  public objEnvio: ObjetoEnvio = new ObjetoEnvio();

  constructor(
    private _dialogService: DialogService,
    private _router: Router,
    private _storageService: StorageService,
    private _alerta: AlertaService,
    private _locacaoService: LocacaoService,
    private _compraService: CompraService,
    private _produtoService: ProdutoService,
    private _usuarioService: UsuarioService,
    private _loadService: LoadService
  ) {
    this._loadService.getLoader().subscribe((r) => {
      this.carregarUsuario();
    });
  }

  carregarUsuario(): void {
    let usuario = this._storageService.getItem<Usuario>(StorageEnum.USUARIO);
    if (usuario) {
      this._usuarioService.getClienteById(usuario.id).subscribe(
        (cliente: Cliente) => {
          if (cliente) {
            this._storageService.setItem<Cliente>(StorageEnum.CLIENTE, cliente);
            this.labelEntrar = `Meu Perfil ${
              cliente.nome ? " - " + cliente.nome : ""
            }`;
          } else {
            this.labelEntrar = "Entrar";
          }
        },
        (error) => {
          this._storageService.removeItem(StorageEnum.CLIENTE);
          this._alerta.erro(error);
          this.labelEntrar = "Entrar";
        }
      );
    } else {
      this.labelEntrar = "Entrar";
    }
  }

  ngOnInit(): void {
    this._locacaoService.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
      this.carregarCarrinho();
    });
  }

  public carregarCarrinho(): void {
    this._compraService.getObjetoEnvio().subscribe(
      (objEnv: ObjetoEnvio) => {
        this.objEnvio = this._storageService.getItem<ObjetoEnvio>(
          StorageEnum.OBJETO_ENVIO
        );

        let produtos = this.objEnvio ? this.objEnvio.produtos : [];
        this.getValorTotal(produtos, this.pacotes);
      },
      (erro) => {
        this._alerta.alerta(MensagemEnum.FALHA_AO_RECUPERAR_CARRINHO);
      }
    );
  }

  public getValorTotal(produtos: Produto[], pacotes: Pacote[]) {
    let valorTotal: number = this._produtoService.getValorTotalProdutos(
      produtos,
      pacotes
    );

    this.setLabelCarrinho(produtos.length, valorTotal);
  }

  public setLabelCarrinho(quantidadeProdutos: number, valorTotal: number) {
    this.labelCarrinho = `Carrinho: ${quantidadeProdutos}
    Itens - ${this.moedaPipe.transform(valorTotal)}`;
  }

  public abrirLogin() {
    let usuario: Usuario = this._storageService.getItem<Usuario>(
      StorageEnum.USUARIO
    );
    if (usuario) {
      const ref = this._dialogService.open(HomeMinhaContaComponent, {
        header: "Meu Perfil",
        width: "70%",
      });
    } else {
      const ref = this._dialogService.open(LoginComponent, {
        header: "",
        width: "70%",
      });
    }
  }

  public abrirCadastro() {
    const ref = this._dialogService.open(CadastroComponent, {
      header: "",
      width: "70%",
    });
  }

  public abrirCarrinho() {
    if (this.objEnvio && this.objEnvio.produtos.length > 0) {
      this._router.navigate([RotasEnum.COMPRAS, RotasEnum.CARRINHO]);
    } else {
      this._alerta.alerta(MensagemEnum.CARRINHO_VAZIO);
    }
  }
}
