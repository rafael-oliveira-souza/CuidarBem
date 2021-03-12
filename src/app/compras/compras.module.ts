import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComprasRoutingModule } from "./compras-routing.module";
import { CarrinhoComponent } from "./componentes/compras-carrinho/carrinho.component";
import { SharedModule } from "../shared/shared.module";
import { ComprasConclusaoComponent } from './componentes/compras-conclusao/compras-conclusao.component';

@NgModule({
  declarations: [CarrinhoComponent, ComprasConclusaoComponent],
  imports: [CommonModule, ComprasRoutingModule, SharedModule],
})
export class ComprasModule {}
