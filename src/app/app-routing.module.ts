import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RotasEnum } from "./shared/models/enums/RotasEnum";

const routes: Routes = [
  {
    path: RotasEnum.NONE,
    redirectTo: RotasEnum.HOME,
    pathMatch: RotasEnum.FULL,
  },
  {
    path: RotasEnum.HOME,
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: RotasEnum.COMPRAS,
    loadChildren: () =>
      import("./compras/compras.module").then((m) => m.ComprasModule),
  },
  {
    path: "**",
    redirectTo: RotasEnum.HOME,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
