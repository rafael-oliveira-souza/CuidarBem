import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UtilService } from "../servicos/util.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public token: string;

  constructor(private _router: Router, private _utils: UtilService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (location.href.includes(environment.apiCrescerBemServer)) {
      let rota = location.href.replace(
        environment.apiCrescerBemServer + "/",
        ""
      );
      this._router.navigate([rota]);
    }

    if (req.url.includes(environment.mercadoPago)) {
      this._utils.getTokenMercadoPago().subscribe((token) => {
        this.token = token;
      });
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(req);
  }
}
