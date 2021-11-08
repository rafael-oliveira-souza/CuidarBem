import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { Cliente } from "src/app/shared/models/classes/Cliente";
import { FaixaEtaria } from "src/app/shared/models/classes/FaixaEtaria";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Pedido } from "src/app/shared/models/classes/Pedido";
import { Produto } from "src/app/shared/models/classes/Produto";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import {
  AlertaService,
  Mensagem,
} from "src/app/shared/servicos/alerta.service";
import { ClienteService } from "src/app/shared/servicos/cliente.service";
import { PedidoService } from "src/app/shared/servicos/pedido.service";

@Component({
  selector: "app-home-admin",
  templateUrl: "./home-admin.component.html",
  styleUrls: ["./home-admin.component.scss"],
})
export class HomeAdminComponent implements OnInit {
  public objsFormulario: any;
  public formulario: FormGroup;
  public forms: { nome: string; valor: any }[];
  public uploadedFiles: any[] = [];
  public pedidos: Array<Pedido> = [];
  public clientes: Array<Cliente> = [];
  public form: any;

  constructor(
    private _alerta: AlertaService,
    private _clienteService: ClienteService,
    private _pedidoService: PedidoService
  ) {
    this.forms = [
      { nome: "Produto", valor: { nome: "Produto", valor: 1 } },
      {
        nome: "Categoria",
        valor: { nome: "Categoria", valor: 2 },
      },
      { nome: "Faixa", valor: { nome: "Faixa", valor: 3 } },
      { nome: "Locação", valor: { nome: "Locação", valor: 4 } },
    ];
  }

  ngOnInit(): void {
    this.getClientes();
    this._pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  public getClientes() {
    this._clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  public getNomeCliente(id: number) {
    let nome = "";
    this.clientes.forEach((cliente) => {
      if (cliente.id == id) {
        nome = cliente.nome + " " + cliente.sobrenome + " - " + cliente.cpf;
        return;
      }
    });

    return nome;
  }

  public atualizarPedidos() {
    this._pedidoService.atualizarSituacaoPedido(this.pedidos).subscribe(
      (r) => {
        this._alerta.sucesso(MensagemEnum.PEDIDO_ATUALIZADOS);
      },
      (error) => {
        this._alerta.erro(error);
      }
    );
  }

  public alterarFormulario() {
    console.log(this.form);
    console.log(this.objsFormulario);
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
