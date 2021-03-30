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
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { RatingModule } from "primeng/rating";
import { BadgeModule } from "primeng/badge";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { InputNumberModule } from "primeng/inputnumber";
import { ToastModule } from "primeng/toast";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressBarModule } from "primeng/progressbar";
import { SliderModule } from "primeng/slider";
import { PaginatorModule } from "primeng/paginator";
import { GalleriaModule } from "primeng/galleria";
import { PanelModule } from "primeng/panel";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CarouselModule } from "primeng/carousel";
import { ProgressSpinnerModule } from "primeng/progressspinner";

//components
import { HeaderComponent } from "./componentes/header/header.component";
import { FooterComponent } from "./componentes/footer/footer.component";
import { CadastroComponent } from "./componentes/cadastro/cadastro.component";
import { LoginComponent } from "./componentes/login/login.component";
import { BarraDeAcoesComponent } from "./componentes/barra-de-acoes/barra-de-acoes.component";
import { CartaoComponent } from "./componentes/cartao/cartao.component";
import { ProdutoComponent } from "./componentes/produto/produto.component";
import { ScrollComponent } from "./componentes/scroll/scroll.component";
import { GaleriaComponent } from "./componentes/galeria/galeria.component";
import { LoaderComponent } from "./componentes/loader/loader.component";

//pipes
import { CepPipe } from "./pipes/cep.pipe";
import { ContinuePipe } from "./pipes/continue.pipe";
import { CpfPipe } from "./pipes/cpf.pipe";
import { DataPipe } from "./pipes/data.pipe";
import { EnderecoPipe } from "./pipes/endereco.pipe";
import { GeneroPipe } from "./pipes/genero.pipe";
import { MoedaPipe } from "./pipes/moeda.pipe";
import { SemInfoPipe } from "./pipes/semInfo.pipe";
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
  declarations: [
    //components
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    LoginComponent,
    BarraDeAcoesComponent,
    CartaoComponent,
    ProdutoComponent,
    ScrollComponent,
    GaleriaComponent,
    LoaderComponent,

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
    DataViewModule,
    RatingModule,
    DropdownModule,
    BadgeModule,
    ScrollPanelModule,
    InputNumberModule,
    ToastModule,
    AutoCompleteModule,
    CheckboxModule,
    ProgressBarModule,
    SliderModule,
    PaginatorModule,
    GalleriaModule,
    PanelModule,
    ConfirmDialogModule,
    CarouselModule,
    ProgressSpinnerModule,
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
    ProdutoComponent,
    ScrollComponent,
    GaleriaComponent,
    LoaderComponent,

    //pipes
    CpfPipe,
    DataPipe,
    EnderecoPipe,
    ContinuePipe,
    MoedaPipe,
    GeneroPipe,
    CepPipe,
    SemInfoPipe,

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
    DataViewModule,
    DropdownModule,
    RatingModule,
    BadgeModule,
    ScrollPanelModule,
    InputNumberModule,
    ToastModule,
    AutoCompleteModule,
    CheckboxModule,
    ProgressBarModule,
    SliderModule,
    PaginatorModule,
    GalleriaModule,
    PanelModule,
    ConfirmDialogModule,
    CarouselModule,
    ProgressSpinnerModule,
  ],
  entryComponents: [LoginComponent, CadastroComponent],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class SharedModule {}
