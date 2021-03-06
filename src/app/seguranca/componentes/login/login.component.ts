import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RotasEnum } from "src/app/shared/models/enums/RotasEnum";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private _router: Router, private _builder: FormBuilder) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    this.form = this._builder.group({
      mail: [
        { value: null, disabled: false },
        [Validators.required, Validators.email],
      ],
      password: [
        { value: null, disabled: false },
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  public logIn() {
    this._router.navigate([RotasEnum.HOME]);
    // if (this.form.valid) {
    //   this.validation.validate = true;
    //   this._router.navigate([AppRoutesEnum.HOME]);
    // } else {
    //   this.validation.validate = false;
    //   if (this.form.controls.mail.errors) {
    //     this.validation.text = Messages.INVALID_MAIL;
    //   } else {
    //     this.validation.text = Messages.INVALID_PASSWORD;
    //   }
    // }
  }
}
