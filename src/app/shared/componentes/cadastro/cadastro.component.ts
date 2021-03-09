import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataUtilsConstants } from "../../models/constantes/DataUtilsConstante";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  public form: FormGroup;
  public dataMaxima: string;
  public dataMinima: string;

  constructor(private _router: Router, private _builder: FormBuilder) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    this.recuperarDatas();
    this.form = this._builder.group({
      nome: [{ value: null, disabled: false }, [Validators.minLength(5)]],
      nascimento: [{ value: this.dataMaxima, disabled: false }, []],
    });
  }

  public recuperarDatas() {
    const dataRef: Date = new Date();

    const dataMin: Date = DataUtilsConstants.subtract(dataRef, 100, "years");
    this.dataMaxima = DataUtilsConstants.dataConvertDateToString(
      dataRef,
      "YYYY-MM-DD"
    );
    this.dataMinima = DataUtilsConstants.dataConvertDateToString(
      dataMin,
      "YYYY-MM-DD"
    );
  }

  public cadastrar() {
    console.log(this.form.value);
  }
}
