import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./componentes/header/header.component";
import { ToolbarModule } from "primeng/toolbar";
import { FooterComponent } from "./componentes/header/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CadastroComponent } from "./componentes/cadastro/cadastro.component";
import { LoginComponent } from "./componentes/login/login.component";
import { InputTextModule } from "primeng/inputtext";
import { InputSwitchModule } from "primeng/inputswitch";
import { TabViewModule } from "primeng/tabview";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    InputSwitchModule,
    TabViewModule,
  ],
  exports: [
    ToolbarModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    LoginComponent,
    CadastroComponent,

    InputTextModule,
    InputSwitchModule,
    TabViewModule,
  ],
})
export class SharedModule {}
