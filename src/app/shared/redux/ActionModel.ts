import { Action } from "@ngrx/store";

export class ActionModel<T> implements Action {
  type: string;
  payload: T;
}
