import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  public _loading$ = new Subject<boolean>();
  private _isLoading: boolean = false;

  public show(): void {
    this._nextValue(true);
  }

  public hide(): void {
    this._nextValue(false);
  }

  public isLoading(): boolean {
    return this._isLoading;
  }

  public isStopped(): boolean {
    return !this.isLoading();
  }

  private _nextValue(status: boolean) {
    this._isLoading = status;
    this._loading$.next(status);
  }
}
