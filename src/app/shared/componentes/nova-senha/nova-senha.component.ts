import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { environment } from "src/environments/environment.prod";
import { Email } from "../../models/classes/Email";
import { UtilsConstante } from "../../models/constantes/UtilsConstante";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { AlertaService } from "../../servicos/alerta.service";
import { EmailService } from "../../servicos/email.service";
import { UsuarioService } from "../../servicos/usuario.service";

@Component({
  selector: "app-nova-senha",
  templateUrl: "./nova-senha.component.html",
  styleUrls: ["./nova-senha.component.scss"],
})
export class NovaSenhaComponent implements OnInit {
  public form: FormGroup;
  public msgErro: String;
  public exibeSenha: Boolean = false;
  public readonly ASSUNTO_EMAIL_TROCA_SENHA = "Crescer Bem - Troca de senha";

  constructor(
    private _emailService: EmailService,
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
        { value: null, disabled: false },
        [Validators.minLength(5), Validators.email, Validators.required],
      ],
      senha: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      confirmarSenha: [
        { value: null, disabled: false },
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
        //email.usuario = environment.usuarioCrescerBem;
        //email.senha = environment.senhaCrescerBem;
        email.destinatarios = emailUsuario;
        email.assunto = this.ASSUNTO_EMAIL_TROCA_SENHA;

        this._emailService.recuperarSenhaEEnviarEmail(email).subscribe(
          (res) => {
            this._ref.close();
            this._alerta.alerta(
              `Enviamos uma mensagem no email ${emailUsuario} para que realize sua troca de senha.`,
              4000
            );
          },
          (error) => {
            this._alerta.erro(error.error["mensagem"]);
          }
        );
      }
    } else {
      this._alerta.erro(MensagemEnum.EMAIL_INVALIDO);
    }
  }
}
