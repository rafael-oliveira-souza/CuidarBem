import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Usuario } from "../models/classes/Usuario";
import { Cliente } from "../models/classes/Cliente";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public criarUsuario(usuario: Usuario) {
    return this._http.post<any>(`${environment.api_server}/usuario`, usuario);
  }

  public criarCliente(cliente: Cliente) {
    return this._http.post<any>(`${environment.api_server}/cliente`, cliente);
  }

  public atualizarCliente(cliente: Cliente) {
    return this._http.put<any>(
      `${environment.api_server}/cliente/atualizar`,
      cliente
    );
  }

  public getClienteById(idCliente: number): Observable<Cliente> {
    return this._http.get<Cliente>(
      `${environment.api_server}/cliente?id=${idCliente}`
    );
  }

  public login(usuario: Usuario): Observable<Usuario> {
    return this._http.post<any>(
      `${environment.api_server}/usuario/login`,
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
      `${environment.api_server}/usuario/excluir?id=${id}`
    );
  }
}
