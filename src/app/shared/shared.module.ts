import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./componentes/header/header.component";
import { ToolbarModule } from "primeng/toolbar";
import { FooterComponent } from "./componentes/header/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, ToolbarModule, FormsModule, ReactiveFormsModule],
  exports: [
    ToolbarModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
