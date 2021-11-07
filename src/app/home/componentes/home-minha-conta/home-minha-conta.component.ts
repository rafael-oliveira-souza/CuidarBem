import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Cliente } from "src/app/shared/models/classes/Cliente";
import {
  Usuario,
  UsuarioTrocaSenha,
} from "src/app/shared/models/classes/Usuario";
import { UF } from "src/app/shared/models/constantes/UF";
import { MensagemEnum } from "src/app/shared/models/enums/MensagemEnum";
import { StorageEnum } from "src/app/shared/models/enums/StorageEnum";
import {
  AlertaService,
  Mensagem,
} from "src/app/shared/servicos/alerta.service";
import { ClienteService } from "src/app/shared/servicos/cliente.service";
import { CompraService } from "src/app/shared/servicos/compra.service";
import { LoadService } from "src/app/shared/servicos/load.service";
import { StorageService } from "src/app/shared/servicos/storage.service";
import { UsuarioService } from "src/app/shared/servicos/usuario.service";

@Component({
  selector: "app-home-minha-conta",
  templateUrl: "./home-minha-conta.component.html",
  styleUrls: ["./home-minha-conta.component.scss"],
})
export class HomeMinhaContaComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public cliente: Cliente = new Cliente();
  public alteraSenha: Boolean = false;
  public formAlteraSenha: FormGroup;
  public form: FormGroup;
  public ufs = UF;

  constructor(
    private _usuarioService: UsuarioService,
    private _storageService: StorageService,
    private _compraService: CompraService,
    private _alerta: AlertaService,
    private _builder: FormBuilder,
    private _ref: DynamicDialogRef,
    private _clienteService: ClienteService,
    private _loadService: LoadService
  ) {}

  ngOnInit(): void {
    this.getCliente();
  }

  public getCliente() {
    this.usuario = this._storageService.getItem<Usuario>(StorageEnum.USUARIO);
    this.cliente = this._storageService.getItem<Cliente>(StorageEnum.CLIENTE);
    if (this.cliente) {
      this.setForm();
      this.formatarCEP();
      this.formatarCPF();
      this.formatarTelefone();
    } else {
      this._clienteService.getClienteById(this.usuario.id).subscribe(
        (cliente: Cliente) => {
          if (cliente) {
            this.cliente = cliente;
            this._storageService.setItem<Cliente>(StorageEnum.CLIENTE, cliente);
            this.setForm();
            this.formatarCEP();
            this.formatarCPF();
            this.formatarTelefone();
          }
        },
        (error) => {
          this._storageService.removeItem(StorageEnum.USUARIO);
          this._storageService.removeItem(StorageEnum.CLIENTE);
          this._alerta.erro(error);
        }
      );
    }
  }

  public setForm() {
    this.formAlteraSenha = this._builder.group({
      senhaAtual: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      novaSenha: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      novaSenhaCp: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
    });

    this.form = this._builder.group({
      nome: [
        { value: this.cliente.nome, disabled: false },
        [Validators.required],
      ],
      sobrenome: [
        { value: this.cliente.sobrenome, disabled: false },
        [Validators.required],
      ],
      cpf: [
        { value: this.cliente.cpf, disabled: false },
        [
          Validators.required,
          Validators.minLength(14), // digits + word characters
          Validators.maxLength(14), // digits + word characters],
        ],
      ],
      cep: [
        { value: this.cliente.cep, disabled: false },
        [Validators.maxLength(9), Validators.required],
      ],
      telefone: [
        { value: this.cliente.telefone, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      estado: [
        { value: this.cliente.estado, disabled: false },
        [Validators.maxLength(2), Validators.required],
      ],
      municipio: [
        { value: this.cliente.municipio, disabled: false },
        [Validators.maxLength(50), Validators.required],
      ],
      logradouro: [
        { value: this.cliente.logradouro, disabled: false },
        [Validators.maxLength(100), Validators.required],
      ],
      numero: [
        { value: this.cliente.numero, disabled: false },
        [Validators.required],
      ],
      complemento: [
        { value: this.cliente.complemento, disabled: false },
        [Validators.maxLength(100)],
      ],
    });
  }

  public formatarTelefone() {
    if (this.form && this.form.controls) {
      let telefone: string = this.form.controls.telefone.value;

      if (telefone) {
        telefone = telefone.replace(/\D/g, "");
        if (telefone.length >= 10) {
          telefone = telefone
            .replace(/(\d{2})?(\d{4,5})?(\d{4})/, "($1) $2-$3")
            .substring(0, 15);
        }
        this.form.controls.telefone.setValue(telefone);
      }
    }
  }

  public formatarCEP() {
    if (this.form && this.form.controls) {
      let cep: string = this.form.controls.cep.value;

      if (cep) {
        cep = cep.replace(/\D/g, "");
        if (cep.length >= 8) {
          cep = cep.replace(/(\d{5})?(\d{3})/, "$1-$2").substring(0, 9);
        }
        this.form.controls.cep.setValue(cep);
      }
    }
  }

  public formatarCPF() {
    if (this.form && this.form.controls) {
      let cpf: string = this.form.controls.cpf.value;

      if (cpf) {
        cpf = cpf.replace(/\D/g, "");
        if (cpf.length >= 11) {
          cpf = cpf
            .replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
            .substring(0, 14);
        }
        this.form.controls.cpf.setValue(cpf);
      }
    }
  }

  public logout() {
    this._usuarioService.logout();
    this._loadService.setLoader(false);
    this._compraService.salvarCarrinho(null);
    this._ref.close();
  }

  public salvar() {
    if (this.form.valid && this.form.touched) {
      let cliente = new Cliente();
      cliente.id = this.cliente.id;
      cliente.nome = this.form.controls.nome.value;
      cliente.sobrenome = this.form.controls.sobrenome.value;

      let telefone: string = this.form.controls.telefone.value;
      cliente.telefone = telefone.replace(/\D/g, "");

      let cpf: string = this.form.controls.cpf.value;
      cliente.cpf = cpf.replace(/\D/g, "");

      let cep: string = this.form.controls.cep.value;
      cliente.cep = cep.replace(/\D/g, "");
      cliente.numero = this.form.controls.numero.value;
      cliente.logradouro = this.form.controls.logradouro.value;
      cliente.complemento = this.form.controls.complemento.value;
      cliente.municipio = this.form.controls.municipio.value;
      cliente.estado = this.form.controls.estado.value;

      this._clienteService.atualizarCliente(cliente).subscribe(
        (result) => {
          this._loadService.setLoader(true);
          this._storageService.setItem<Cliente>(StorageEnum.CLIENTE, cliente);
          this._alerta.sucesso("Cadastro atualizado com sucesso.");
          this._ref.close();
        },
        (error) => {
          this._alerta.erro(error);
        }
      );
    } else {
      if (this.form && !this.form.touched) {
        this._alerta.alerta(MensagemEnum.NENHUM_CAMPO_FOI_ATUALIZADO);
      } else {
        this._alerta.alerta(MensagemEnum.PREENCHA_TODOS_CAMPOS);
      }
    }
  }

  public exibirAlertaSenha() {
    if (this.formAlteraSenha && this.formAlteraSenha.controls) {
      let novaSenha = this.formAlteraSenha.controls.novaSenha.value;
      let novaSenhaCp = this.formAlteraSenha.controls.novaSenhaCp.value;

      return novaSenha && novaSenhaCp && novaSenha != novaSenhaCp;
    }

    return false;
  }

  public alterarSenha() {
    if (this.alteraSenha) {
      let senhaAtual = this.formAlteraSenha.controls.senhaAtual.value;
      let novaSenha = this.formAlteraSenha.controls.novaSenha.value;
      let novaSenhaCp = this.formAlteraSenha.controls.novaSenhaCp.value;

      if (!senhaAtual || !novaSenha || !novaSenhaCp) {
        this._alerta.alerta(MensagemEnum.PREENCHA_TODOS_CAMPOS);
      } else {
        if (novaSenha == novaSenhaCp) {
          let user: UsuarioTrocaSenha = new UsuarioTrocaSenha();
          user.email = this.usuario.email;
          user.senhaAtual = senhaAtual;
          user.senhaNova = novaSenha;
          this._usuarioService.atualizarSenha(user).subscribe(
            (result) => {
              this._alerta.sucesso(MensagemEnum.SENHA_ATUALIZADA_SUCESSO);
              this.formAlteraSenha.controls.senhaAtual.setValue(null);
              this.formAlteraSenha.controls.novaSenha.setValue(null);
              this.formAlteraSenha.controls.novaSenhaCp.setValue(null);
            },
            (error) => {
              this.formAlteraSenha.controls.senhaAtual.setValue(null);
              this.formAlteraSenha.controls.novaSenha.setValue(null);
              this.formAlteraSenha.controls.novaSenhaCp.setValue(null);
              this._alerta.erro(error);
            }
          );
        } else {
          this._alerta.alerta(MensagemEnum.SENHA_INVALIDA);
        }
      }
    }
    this.alteraSenha = !this.alteraSenha;
    this._loadService.setLoader(true);
  }
}
