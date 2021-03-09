import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";
import { HomeProdutosComponent } from "./componentes/home-produtos/home-produtos.component";
import { HomeQuemSomosComponent } from './componentes/home-quem-somos/home-quem-somos.component';

@NgModule({
  declarations: [HomePrincipalComponent, HomeProdutosComponent, HomeQuemSomosComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
