import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";
import { MessagesConstante } from "../../models/constantes/MessagesConstante";

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

  constructor(private _router: Router, private _builder: FormBuilder) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    this.form = this._builder.group({
      email: [
        { value: null, disabled: false },
        [Validators.required, Validators.email],
      ],
      senha: [
        { value: null, disabled: false },
        [Validators.required, Validators.minLength(8)],
      ],
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

  public logIn() {
    if (this.form.valid) {
      this.msgErro = null;
      this._router.navigate([RotasEnum.HOME]);
    } else {
      if (this.form.controls.email.errors) {
        this.msgErro = MessagesConstante.EMAIL_INVALIDO;
      } else {
        this.msgErro = MessagesConstante.SENHA_INVALIDA;
      }
    }
  }
}
