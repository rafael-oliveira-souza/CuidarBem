import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Usuario, UsuarioTrocaSenha } from "../models/classes/Usuario";
import { Cliente } from "../models/classes/Cliente";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";
import { Email } from "../models/classes/Email";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public criarUsuario(usuario: Usuario) {
    return this._http.post<any>(
      `${environment.apiServer}/usuario/salvar`,
      usuario
    );
  }

  public login(usuario: Usuario): Observable<void> {
    return this._http.post<void>(
      `${environment.apiServer}/usuario/login`,
      usuario
    );
  }

  public atualizarSenha(usuario: UsuarioTrocaSenha): Observable<Usuario> {
    return this._http.post<any>(
      `${environment.apiServer}/usuario/atualizarSenha`,
      usuario
    );
  }

  public logout(): void {
    this._storageService.removeAll();
  }

  public getUsuario(): Usuario {
    return this._storageService.getItem<Usuario>(StorageEnum.USUARIO);
  }

  public removeUsuarioById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/usuario/excluir/${id}`
    );
  }

  public recuperarSenhaEEnviarEmail(email: Email): Observable<string> {
    return this._http.post<any>(
      `${environment.apiServer}/usuario/recuperarSenhaEEnviarEmail`,
      email
    );
  }
}
