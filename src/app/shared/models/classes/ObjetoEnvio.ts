import { Produto } from "./Produto";

export class ObjetoEnvio {
  produtos: Array<Produto> = [];
  dataCriacao: Date = new Date();
  dataEnvio: Date = null;

  constructor() {}
}
