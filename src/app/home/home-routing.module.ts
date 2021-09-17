import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RotasEnum } from "../shared/models/enums/RotasEnum";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";
import { HomeProdutosSaibaMaisComponent } from "./componentes/home-produtos-saiba-mais/home-produtos-saiba-mais.component";
import { HomeProdutosComponent } from "./componentes/home-produtos-brinquedo/home-produtos.component";
import { HomeQuemSomosComponent } from "./componentes/home-quem-somos/home-quem-somos.component";
import { HomeLojaComponent } from "./componentes/home-loja/home-loja.component";
import { HomeAdminComponent } from "./componentes/home-admin/home-admin.component";
import { HomeNovidadesComponent } from "./componentes/home-novidades/home-novidades.component";
import { HomePromocoesComponent } from "./componentes/home-promocoes/home-promocoes.component";
import { HomeContatoComponent } from "./componentes/home-contato/home-contato.component";
import { HomeAlugarComponent } from "./componentes/home-alugar/home-alugar.component";
import { HomeDialogandoComponent } from "./componentes/home-dialogando/home-dialogando.component";
import { HomeHigienizacaoComponent } from "./componentes/home-higienizacao/home-higienizacao.component";
import { HomePorIdadeComponent } from "./componentes/home-por-idade/home-por-idade.component";
import { HomeTermosUsoComponent } from "./componentes/home-termos-uso/home-termos-uso.component";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    component: HomePrincipalComponent,
    children: [
      {
        path: RotasEnum.NONE,
        redirectTo: RotasEnum.LOJA,
      },
      {
        path: RotasEnum.ADMIN,
        component: HomeAdminComponent,
      },
      {
        path: RotasEnum.LOJA,
        component: HomeLojaComponent,
      },
      {
        path: `${RotasEnum.LOJA}/${RotasEnum.BRINQUEDOS}`,
        component: HomeProdutosComponent,
      },
      {
        path: `${RotasEnum.LOJA}/${RotasEnum.BRINQUEDOTECA}`,
        component: HomeProdutosComponent,
      },
      {
        path: `${RotasEnum.LOJA}/${RotasEnum.BRINQUEDOS}/${RotasEnum.DESCRICAO}`,
        component: HomeProdutosSaibaMaisComponent,
      },
      {
        path: `${RotasEnum.LOJA}/${RotasEnum.BRINQUEDOTECA}/${RotasEnum.DESCRICAO}`,
        component: HomeProdutosSaibaMaisComponent,
      },
      {
        path: RotasEnum.QUEM_SOMOS,
        component: HomeQuemSomosComponent,
      },
      {
        path: RotasEnum.NOVIDADES,
        component: HomeNovidadesComponent,
      },
      {
        path: RotasEnum.PROMOCOES,
        component: HomePromocoesComponent,
      },
      {
        path: RotasEnum.CONTATO,
        component: HomeContatoComponent,
      },
      {
        path: RotasEnum.ALUGAR,
        component: HomeAlugarComponent,
      },
      {
        path: RotasEnum.DIALOGANDO,
        component: HomeDialogandoComponent,
      },
      {
        path: RotasEnum.HIGIENIZACAO,
        component: HomeHigienizacaoComponent,
      },
      {
        path: RotasEnum.IDADE,
        component: HomePorIdadeComponent,
      },
      {
        path: RotasEnum.TERMOS,
        component: HomeTermosUsoComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
