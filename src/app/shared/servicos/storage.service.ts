import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageUtilsConstante } from "../models/constantes/StorageUtilsConstante";
import { StorageEnum } from "../models/enums/StorageEnum";
import { AlertaService } from "./alerta.service";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private _alerta: AlertaService) {}

  getAll(): Array<any> {
    return StorageUtilsConstante.getAll();
  }

  removeAll(): void {
    StorageUtilsConstante.removeAll();
  }

  removeItem(key: StorageEnum): void {
    StorageUtilsConstante.removeItem(key);
  }

  getItem<T>(key: StorageEnum): T {
    const objectConv: T = StorageUtilsConstante.getItem<T>(key);
    return objectConv;
  }

  setItem<T>(key: StorageEnum, value: T): void {
    StorageUtilsConstante.setItem<T>(key, value);
  }
}
