import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { environment } from "src/environments/environment.prod";
import { Email } from "../../models/classes/Email";
import { ObjetoEnvio } from "../../models/classes/ObjetoEnvio";
import { Usuario } from "../../models/classes/Usuario";
import { UtilsConstante } from "../../models/constantes/UtilsConstante";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { StorageEnum } from "../../models/enums/StorageEnum";
import { AlertaService } from "../../servicos/alerta.service";
import { EmailService } from "../../servicos/email.service";
import { StorageService } from "../../servicos/storage.service";
import { UsuarioService } from "../../servicos/usuario.service";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { NovaSenhaComponent } from "../nova-senha/nova-senha.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public msgErro: String;
  public exibeSenha: Boolean = false;
  public tipoInput: String = "password";
  public classeIcone: String = "pi  pi-eye-slash";
  public readonly ASSUNTO_EMAIL_TROCA_SENHA = "Crescer Bem - Troca de senha";

  constructor(
    private _alerta: AlertaService,
    private _builder: FormBuilder,
    private _dialogService: DialogService,
    private _ref: DynamicDialogRef,
    private _usuarioService: UsuarioService,
    private _emailService: EmailService,
    private _storageService: StorageService
  ) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    this.form = this._builder.group({
      email: [{ value: null, disabled: false }, [Validators.email]],
      senha: [{ value: null, disabled: false }, [Validators.minLength(8)]],
    });
  }

  public mostrarSenha() {
    if (this.exibeSenha) {
      this.tipoInput = "text";
      this.classeIcone = "pi pi-eye";
    } else {
      this.tipoInput = "password";
      this.classeIcone = "pi pi-eye-slash";
    }
    this.exibeSenha = !this.exibeSenha;
  }

  public instanciarObjetoEnvio() {
    this._storageService.setItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO,
      new ObjetoEnvio()
    );
  }

  public salvarUsuario(usuario: Usuario) {
    this._storageService.setItem<Usuario>(StorageEnum.USUARIO, usuario);
  }

  public logIn() {
    if (this.form.valid) {
      this.msgErro = null;
      let usuario = new Usuario();
      usuario.email = this.form.controls.email.value;
      usuario.senha = this.form.controls.senha.value;
      this._usuarioService.login(usuario).subscribe(
        (user: Usuario) => {
          this.salvarUsuario(user);
          // this.instanciarObjetoEnvio();
          this._ref.close();
        },
        (e) => {
          this._alerta.erro(e.error["mensagem"]);
        }
      );
    } else {
      if (this.form.controls.email.errors) {
        this.msgErro = MensagemEnum.EMAIL_INVALIDO;
      } else {
        this.msgErro = MensagemEnum.SENHA_INVALIDA;
      }
    }
  }

  public abrirCadastro() {
    this._ref.close();
    const ref = this._dialogService.open(CadastroComponent, {
      header: "",
      width: "70%",
    });
  }

  public esqueceuSenha() {
    this._ref.close();
    const ref = this._dialogService.open(NovaSenhaComponent, {
      header: "",
      width: "70%",
    });
  }
}
