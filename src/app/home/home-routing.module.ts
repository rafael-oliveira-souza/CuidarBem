import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RotasEnum } from "../shared/models/enums/RotasEnum";
import { HomePrincipalComponent } from "./componentes/home-principal/home-principal.component";
import { HomeProdutosSaibaMaisComponent } from "./componentes/home-produtos-saiba-mais/home-produtos-saiba-mais.component";
import { HomeProdutosComponent } from "./componentes/home-produtos/home-produtos.component";
import { HomeQuemSomosComponent } from "./componentes/home-quem-somos/home-quem-somos.component";

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
        path: RotasEnum.LOJA,
        component: HomeProdutosComponent,
      },
      {
        path: RotasEnum.QUEM_SOMOS,
        component: HomeQuemSomosComponent,
      },
      {
        path: `${RotasEnum.PRODUTOS}/${RotasEnum.DESCRICAO}`,
        component: HomeProdutosSaibaMaisComponent,
      },
      {
        path: RotasEnum.NOVIDADES,
        component: HomeQuemSomosComponent,
      },
      {
        path: RotasEnum.PROMOCOES,
        component: HomeQuemSomosComponent,
      },
      {
        path: RotasEnum.CONTATO,
        component: HomeProdutosComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
