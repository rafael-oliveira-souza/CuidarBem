import { Action } from "@ngrx/store";
import { Produto } from "../../models/classes/Produto";
import { ActionModel } from "../ActionModel";

enum ActionTypes {
  ADD = "Adicionar",
  REMOVE = "Remover",
  CALC_TOTAL = "Calcular Total",
}

export const adicionar = (produto: Produto) => {
  return <Action>{ type: ActionTypes.ADD, payload: produto };
};

export const remover = (produto: Produto) => {
  return <Action>{ type: ActionTypes.REMOVE, payload: produto };
};

export const INITIAL_STATE = new Produto();

export function produtoReducer(
  state = INITIAL_STATE,
  action: ActionModel<Produto>
): Produto {
  switch (action.type) {
    case ActionTypes.ADD:
      console.log(state);
      return state;

    case ActionTypes.REMOVE: {
      // if (state.quantidade >= 0) {
      //   return state;
      // } else {
      //   state.quantidade = 0;
      // }
      return state;
    }
    default:
      return state;
  }
}
