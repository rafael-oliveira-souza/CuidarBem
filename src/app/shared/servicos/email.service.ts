import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Email } from "../models/classes/Email";
import { ObjetoEnvio } from "../models/classes/ObjetoEnvio";
import { Pacote } from "../models/classes/Pacote";
import { Produto } from "../models/classes/Produto";
import { Mocks } from "../models/constantes/Mocks";
import { MensagemEnum } from "../models/enums/MensagemEnum";
import { SituacaoProdutoEnum } from "../models/enums/SituacaoProdutoEnum";
import { StorageEnum } from "../models/enums/StorageEnum";
import { AlertaService } from "./alerta.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  constructor(private _http: HttpClient) {}

  public enviarEmail(email: Email): Observable<any> {
    return this._http.post<any>(
      `${environment.apiServer}/util/enviarEmail`,
      email
    );
  }
}
