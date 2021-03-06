import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SegurancaRoutingModule } from "./seguranca-routing.module";
import { LoginComponent } from "./componentes/login/login.component";
import { CadastroComponent } from "./componentes/cadastro/cadastro.component";
import { SharedModule } from "primeng/api";

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [CommonModule, SegurancaRoutingModule, SharedModule],
})
export class SegurancaModule {}
