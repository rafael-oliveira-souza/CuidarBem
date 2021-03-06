import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./seguranca/componentes/login/login.component";
import { RotasEnum } from "./shared/models/enums/RotasEnum";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    component: LoginComponent,
    pathMatch: RotasEnum.FULL,
  },
  {
    path: RotasEnum.HOME,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: RotasEnum.SEGURANCA,
    loadChildren: () =>
      import("./seguranca/seguranca.module").then((m) => m.SegurancaModule),
  },
  {
    path: RotasEnum.COMPRAS,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
