import { Component, Input, OnInit } from "@angular/core";
import { Cartao } from "../../models/classes/Cartao";

@Component({
  selector: "app-cartao",
  templateUrl: "./cartao.component.html",
  styleUrls: ["./cartao.component.scss"],
})
export class CartaoComponent implements OnInit {
  @Input("cartao")
  public cartao: Cartao = new Cartao();

  constructor() {}

  ngOnInit(): void {}
}
