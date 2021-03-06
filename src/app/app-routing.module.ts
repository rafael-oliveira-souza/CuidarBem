import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./shared/componentes/login/login.component";
import { RotasEnum } from "./shared/models/enums/RotasEnum";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    redirectTo: RotasEnum.LOGIN,
    pathMatch: RotasEnum.FULL,
  },
  {
    path: RotasEnum.HOME,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: RotasEnum.COMPRAS,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: RotasEnum.LOGIN,
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: RotasEnum.LOGIN,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
