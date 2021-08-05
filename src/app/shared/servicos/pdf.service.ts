import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class PdfService {
  constructor(private _http: HttpClient) {}

  public generatePdf(html: string): Observable<any> {
    return this._http.post<any>(`${environment.apiServer}/gerarPdf`, {
      html: html,
    });
  }
}
