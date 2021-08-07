import { Component } from "@angular/core";
import { Router } from "@angular/router";

declare var require: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "AppCuidarBem";
  linkWhatsapp = "";
  showWhatsapp = false;

  constructor(private _router: Router) {
    this._router.events.subscribe((rout: any) => {
      if (
        window.location.href.includes("home") &&
        !window.location.href.includes("admin")
      ) {
        this.showWhatsapp = true;
      } else {
        this.showWhatsapp = false;
      }
    });
  }

  ngOnInit(): void {
    // this._utilService.getLinkWhatsapp().subscribe((link) => {
    // this.linkWhatsapp = link;
    //});
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  public abrirWhatsapp() {
    window.open(this.linkWhatsapp, "_blank");
  }
}
