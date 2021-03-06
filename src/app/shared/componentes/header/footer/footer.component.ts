import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  @Input("estilo")
  public estilo: any = {};

  @Input("classe")
  public classe: any = {};

  constructor() {}

  ngOnInit(): void {
    this.classe = "footer " + this.classe;
  }
}
