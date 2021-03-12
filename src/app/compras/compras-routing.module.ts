import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RotasEnum } from "../shared/models/enums/RotasEnum";
import { CarrinhoComponent } from "./componentes/compras-carrinho/carrinho.component";
import { ComprasConclusaoComponent } from "./componentes/compras-conclusao/compras-conclusao.component";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    redirectTo: RotasEnum.CARRINHO,
  },
  {
    path: RotasEnum.CARRINHO,
    component: CarrinhoComponent,
  },
  {
    path: RotasEnum.CONCLUSAO,
    component: ComprasConclusaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasRoutingModule {}
