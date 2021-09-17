import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";
import { HomeQuemSomosComponent } from "./componentes/home-quem-somos/home-quem-somos.component";
import { HomeProdutosSaibaMaisComponent } from "./componentes/home-produtos-saiba-mais/home-produtos-saiba-mais.component";
import { HomeProdutosPesquisaComponent } from "./componentes/home-produtos-pesquisa/home-produtos-pesquisa.component";
import { HomeProdutosComponent } from "./componentes/home-produtos-brinquedo/home-produtos.component";
import { HomeLojaComponent } from "./componentes/home-loja/home-loja.component";
import { HomeProdutosBrinquedotecaComponent } from "./componentes/home-produtos-brinquedoteca/home-produtos-brinquedoteca.component";
import { HomeAdminComponent } from "./componentes/home-admin/home-admin.component";
import { HomeMinhaContaComponent } from "./componentes/home-minha-conta/home-minha-conta.component";
import { HomeNovidadesComponent } from "./componentes/home-novidades/home-novidades.component";
import { HomePromocoesComponent } from "./componentes/home-promocoes/home-promocoes.component";
import { HomeContatoComponent } from "./componentes/home-contato/home-contato.component";
import { HomePorIdadeComponent } from "./componentes/home-por-idade/home-por-idade.component";
import { HomeTermosUsoComponent } from "./componentes/home-termos-uso/home-termos-uso.component";
import { HomeHigienizacaoComponent } from "./componentes/home-higienizacao/home-higienizacao.component";
import { HomeDialogandoComponent } from "./componentes/home-dialogando/home-dialogando.component";
import { HomeAlugarComponent } from "./componentes/home-alugar/home-alugar.component";

@NgModule({
  declarations: [
    HomePrincipalComponent,
    HomeQuemSomosComponent,
    HomeProdutosComponent,
    HomeProdutosSaibaMaisComponent,
    HomeProdutosPesquisaComponent,
    HomeLojaComponent,
    HomeMinhaContaComponent,
    HomeProdutosBrinquedotecaComponent,
    HomeAdminComponent,
    HomeNovidadesComponent,
    HomePromocoesComponent,
    HomeContatoComponent,
    HomePorIdadeComponent,
    HomeTermosUsoComponent,
    HomeHigienizacaoComponent,
    HomeDialogandoComponent,
    HomeAlugarComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  entryComponents: [HomeMinhaContaComponent],
})
export class HomeModule {}
