import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//prime modules
import { ToolbarModule } from "primeng/toolbar";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { CalendarModule } from "primeng/calendar";
import { OrderListModule } from "primeng/orderlist";
import { TableModule } from "primeng/table";

//components
import { HeaderComponent } from "./componentes/header/header.component";
import { FooterComponent } from "./componentes/footer/footer.component";
import { CadastroComponent } from "./componentes/cadastro/cadastro.component";
import { LoginComponent } from "./componentes/login/login.component";
import { BarraDeAcoesComponent } from "./componentes/barra-de-acoes/barra-de-acoes.component";
import { CartaoComponent } from "./componentes/cartao/cartao.component";
import { CepPipe } from "./pipes/cep.pipe";
import { ContinuePipe } from "./pipes/continue.pipe";
import { CpfPipe } from "./pipes/cpf.pipe";
import { DataPipe } from "./pipes/data.pipe";
import { EnderecoPipe } from "./pipes/endereco.pipe";
import { GeneroPipe } from "./pipes/genero.pipe";
import { MoedaPipe } from "./pipes/moeda.pipe";
import { SemInfoPipe } from "./pipes/semInfo.pipe";

@NgModule({
  declarations: [
    //components
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    LoginComponent,
    BarraDeAcoesComponent,
    CartaoComponent,

    //pipes
    CpfPipe,
    DataPipe,
    EnderecoPipe,
    ContinuePipe,
    MoedaPipe,
    GeneroPipe,
    CepPipe,
    SemInfoPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //prime modules
    ToolbarModule,
    InputTextModule,
    DynamicDialogModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    CalendarModule,
    OrderListModule,
    TableModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    //components
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    LoginComponent,
    CartaoComponent,
    BarraDeAcoesComponent,

    //prime modules
    InputTextModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    CalendarModule,
    OrderListModule,
    TableModule,

    //pipes
    CpfPipe,
    DataPipe,
    EnderecoPipe,
    ContinuePipe,
    MoedaPipe,
    GeneroPipe,
    CepPipe,
    SemInfoPipe,
  ],
  entryComponents: [LoginComponent, CadastroComponent],
  providers: [DialogService],
})
export class SharedModule {}
