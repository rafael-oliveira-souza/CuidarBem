import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageUtilsConstante } from "../models/constantes/StorageUtilsConstante";
import { StorageEnum } from "../models/enums/StorageEnum";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private objectSource = new BehaviorSubject(null);
  private observableObject: Observable<any> = this.objectSource.asObservable();

  constructor() {}

  getAll(): Array<any> {
    return StorageUtilsConstante.getAll();
  }

  removeAll(): void {
    StorageUtilsConstante.removeAll();
  }

  removeItem(key: StorageEnum): void {
    StorageUtilsConstante.removeItem(key);
  }

  getItem<T>(key: StorageEnum): Observable<T> {
    if (this.objectSource.getValue() == null) {
      const objectConv: T = StorageUtilsConstante.getItem<T>(key);
      this.objectSource.next(objectConv);
    }

    return this.observableObject;
  }

  setItem<T>(key: StorageEnum, value: T): void {
    StorageUtilsConstante.setItem<T>(key, value);
    this.objectSource.next(value);
  }

  unsubscribe() {
    this.objectSource.unsubscribe();
  }
}
