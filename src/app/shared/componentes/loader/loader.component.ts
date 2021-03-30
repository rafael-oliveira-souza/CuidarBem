import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderService } from "../../servicos/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  public loading$: Subject<boolean>;

  constructor(private _loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loading$ = this._loaderService._loading$;
  }
}
