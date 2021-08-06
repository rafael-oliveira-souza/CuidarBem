import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadService {
  private object: boolean;
  private objectSource;
  private observableObject: Observable<boolean>;

  constructor() {
    this.objectSource = new BehaviorSubject(this.object);
    this.observableObject = this.objectSource.asObservable();
  }

  setLoader(obj: boolean) {
    this.objectSource.next(obj);
  }
  getLoader(): Observable<boolean> {
    return this.observableObject;
  }
}
