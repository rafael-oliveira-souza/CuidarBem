import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";
import { HomeQuemSomosComponent } from "./componentes/home-quem-somos/home-quem-somos.component";
import { HomeProdutosSaibaMaisComponent } from "./componentes/home-produtos-saiba-mais/home-produtos-saiba-mais.component";
import { HomeProdutosPesquisaComponent } from "./componentes/home-produtos-pesquisa/home-produtos-pesquisa.component";
import { HomeProdutosComponent } from "./componentes/home-produtos-brinquedo/home-produtos.component";
import { HomeLojaComponent } from './componentes/home-loja/home-loja.component';
import { HomeMinhaContaComponent } from './componentes/home-minha-conta/home-minha-conta.component';

@NgModule({
  declarations: [
    HomePrincipalComponent,
    HomeQuemSomosComponent,
    HomeProdutosComponent,
    HomeProdutosSaibaMaisComponent,
    HomeProdutosPesquisaComponent,
    HomeLojaComponent,
    HomeMinhaContaComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
