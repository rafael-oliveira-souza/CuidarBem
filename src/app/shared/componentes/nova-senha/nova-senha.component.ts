import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Email } from "../../models/classes/Email";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { AlertaService } from "../../servicos/alerta.service";
import { UsuarioService } from "../../servicos/usuario.service";

@Component({
  selector: "app-nova-senha",
  templateUrl: "./nova-senha.component.html",
  styleUrls: ["./nova-senha.component.scss"],
})
export class NovaSenhaComponent implements OnInit {
  private readonly RESULT_TROCA_SENHA =
    "Enviamos uma mensagem no seu email para que realize sua troca de senha.";

  public form: FormGroup;
  public msgErro: String;
  public exibeSenha: Boolean = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _alerta: AlertaService,
    private _builder: FormBuilder,
    private _ref: DynamicDialogRef
  ) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    // this.recuperarDatas();
    this.form = this._builder.group({
      email: [
        { value: "", disabled: false },
        [Validators.minLength(5), Validators.email, Validators.required],
      ],
      senha: [
        { value: "", disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      confirmarSenha: [
        { value: "", disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
    });
  }

  public esqueceuSenha() {
    if (this.form.controls.email.valid) {
      let emailUsuario = this.form.controls.email.value;

      if (!emailUsuario) {
        this._alerta.alerta(MensagemEnum.PREENCHA_EMAIL);
      } else {
        let email: Email = new Email();
        email.destinatarios = emailUsuario;
        this._usuarioService.recuperarSenhaEEnviarEmail(email).subscribe(
          (res: string) => {
            this._ref.close();
            this._alerta.alerta(this.RESULT_TROCA_SENHA, 4000);
          },
          (error) => {
            this._alerta.erro(error);
          }
        );
      }
    } else {
      this._alerta.erro(MensagemEnum.EMAIL_INVALIDO);
    }
  }
}
