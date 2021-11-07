import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Pix } from "../models/classes/Pix";
import { Whatsapp } from "../models/classes/Whatsapp";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor(private _http: HttpClient) {}

  public getDadosPix(): Observable<Pix> {
    return this._http.get<Pix>(`${environment.apiServer}/util/pix`);
  }

  public getLinkWhatsapp(): Observable<Whatsapp> {
    return this._http.get<Whatsapp>(`${environment.apiServer}/util/whatsapp`);
  }

  //public getTokenMercadoPago(): Observable<string> {
  //return this._http.get<string>(
  // `${environment.apiServer}/util/tokenMercadoPago`
  //);
  //}
}
