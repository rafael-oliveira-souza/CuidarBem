import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-scroll",
  templateUrl: "./scroll.component.html",
  styleUrls: ["./scroll.component.scss"],
})
export class ScrollComponent implements OnInit {
  @ViewChild("scrollFilho") scrollFilho: ElementRef;

  @Input("altura")
  public altura: string;

  @Input("largura")
  public largura: string = "100%";

  constructor(private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    if (!this.altura) {
      this.altura = this.scrollFilho.nativeElement.clientHeight + "px";
    }
  }
}
