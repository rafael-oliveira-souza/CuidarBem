import { Component, OnInit, Input } from "@angular/core";
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { LoaderService } from "src/app/shared/servicos/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  @Input("template")
  public template: any = null;

  @Input("animation")
  public animation: string = ngxLoadingAnimationTypes.threeBounce;

  @Input("primaryColour")
  public primaryColour = "#2dd36f";

  @Input("secondaryColour")
  public secondaryColour = "#005ca9";

  @Input("tertiaryColour")
  public tertiaryColour = "#e9e51d";

  @Input("backdropBorderRadius")
  public backdropBorderRadius: string = "10px";

  @Input("backdropBackgroundColour")
  public backdropBackgroundColour: string = "rgba(255,255,255,0.3)";

  @Input("fullScreenBackdrop")
  public fullScreenBackdrop: boolean = false;

  @Input("show")
  public loading = false;

  @Input("ativarService")
  public ativarService = true;

  public config = {
    animationType: this.animation,
    backdropBackgroundColour: this.backdropBackgroundColour,
    backdropBorderRadius: this.backdropBorderRadius,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.tertiaryColour,
    fullScreenBackdrop: this.fullScreenBackdrop,
  };

  constructor(private _loaderService: LoaderService) {}

  ngOnInit(): void {
    if (this.ativarService) {
      this._loaderService.isLoading.subscribe((loading) => {
        this.loading = loading;
      });
    }
  }
}
