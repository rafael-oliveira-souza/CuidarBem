import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Categoria } from "src/app/shared/models/classes/Categoria";
import { FaixaEtaria } from "src/app/shared/models/classes/FaixaEtaria";
import { Pacote } from "src/app/shared/models/classes/Pacote";
import { Produto } from "src/app/shared/models/classes/Produto";

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
  public form: any;

  constructor(private _builder: FormBuilder) {
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

  ngOnInit(): void {}

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
