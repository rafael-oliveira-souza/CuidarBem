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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public token: string;

  constructor(private _router: Router) {}

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
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${environment.mercadoPagoToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
