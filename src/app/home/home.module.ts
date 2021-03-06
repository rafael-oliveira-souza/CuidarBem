import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeProdutosComponent } from "./componentes/home-produtos/home-produtos.component";
import { SharedModule } from "../shared/shared.module";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";

@NgModule({
  declarations: [HomeProdutosComponent, HomePrincipalComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
