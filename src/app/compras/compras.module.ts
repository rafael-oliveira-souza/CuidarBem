import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComprasRoutingModule } from "./compras-routing.module";
import { CarrinhoComponent } from "./componentes/compras-carrinho/carrinho.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CarrinhoComponent],
  imports: [CommonModule, ComprasRoutingModule, SharedModule],
})
export class ComprasModule {}
