import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { FaixaEtaria } from "../models/classes/FaixaEtaria";
import { Imagem } from "../models/classes/Imagem";
import { Mocks } from "../models/constantes/Mocks";
import { StorageEnum } from "../models/enums/StorageEnum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class FotoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getImagens(): Observable<Array<Imagem>> {
    let imagens: Imagem[] = this._storageService.getItem(StorageEnum.IMAGENS);

    if (imagens && imagens.length > 0) {
      return new BehaviorSubject(imagens).asObservable();
    } else {
      return this._http.get<Array<Imagem>>(
        `${environment.apiServer}/imagem/todos`
      );
    }
  }

  public getImagensPorDiretorios(diretorio: string): Observable<Array<Imagem>> {
    let imagens: Imagem[] = this._storageService.getItem(StorageEnum.IMAGENS);
    if (imagens && imagens.length > 0) {
      let imgsDir: Imagem[] = imagens.filter((img) =>
        img.diretorio.includes(diretorio)
      );
      if (imgsDir && imgsDir.length > 0) {
        return new BehaviorSubject(imgsDir).asObservable();
      }
    }
    return this._http.get<Array<Imagem>>(
      `${environment.apiServer}/imagem/getImagensPorDiretorio?diretorio=${diretorio}`
    );
  }
}
