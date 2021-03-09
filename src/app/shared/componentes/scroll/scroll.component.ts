import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-scroll",
  templateUrl: "./scroll.component.html",
  styleUrls: ["./scroll.component.scss"],
})
export class ScrollComponent implements OnInit {
  @Input("altura")
  public altura: string = "100%";

  @Input("largura")
  public largura: string = "100%";

  constructor() {}

  ngOnInit(): void {}
}
