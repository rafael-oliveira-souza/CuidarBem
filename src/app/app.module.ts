import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./shared/componentes/loader/loader-interceptor";

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
