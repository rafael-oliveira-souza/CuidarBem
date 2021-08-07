import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor(private _http: HttpClient) {}

  public getDadosPix(): Observable<string> {
    return this._http.get<string>(`${environment.apiServer}/util/pix`);
  }

  public getLinkWhatsapp(): Observable<string> {
    return this._http.get<string>(`${environment.apiServer}/util/whatsapp`);
  }

  //public getTokenMercadoPago(): Observable<string> {
  //return this._http.get<string>(
  // `${environment.apiServer}/util/tokenMercadoPago`
  //);
  //}
}
