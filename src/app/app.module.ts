import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { DialogService } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { SharedModule } from "./shared/shared.module";

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    DialogService,
    MessageService,
    { provide: LOCALE_ID, useValue: "pt" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
