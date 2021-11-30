import { StorageEnum } from "../enums/StorageEnum";
import { DataUtilsConstants } from "./DataUtilsConstante";

export const StorageUtilsConstante = {
  getAll(): Array<any> {
    let list: Array<{ key: string; value: any }> = [];
    let values = Object.values(StorageEnum);

    values.forEach((key) => {
      let object: string = localStorage.getItem(key);
      if (object != null) {
        list.push({ key: key, value: JSON.parse(object) });
      }
    });

    return list;
  },

  removeAll(): void {
    localStorage.clear();
  },

  removeItem(key: StorageEnum): void {
    localStorage.removeItem(key);
  },

  getItem<T>(key: StorageEnum): T {
    let object: string = localStorage.getItem(key);
    let objectConv: T = JSON.parse(object);

    return objectConv;
  },

  setItem<T>(key: StorageEnum, value: T): void {
    if (value && value instanceof Object) {
      value["dataCriacao"] = DataUtilsConstants.newDate();
    }

    let object: string = JSON.stringify(value);
    localStorage.setItem(key, object);
  },
};
