import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RotasEnum } from "../shared/models/enums/RotasEnum";
import { CarrinhoComponent } from "./componentes/compras-carrinho/carrinho.component";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    redirectTo: RotasEnum.CARRINHO,
  },
  {
    path: RotasEnum.CARRINHO,
    component: CarrinhoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasRoutingModule {}
