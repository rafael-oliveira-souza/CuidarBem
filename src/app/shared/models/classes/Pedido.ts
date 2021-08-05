import { StatusPagamentoEnum } from "../enums/StatusPagamentoEnum";
import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

export class Pedido {
  id: number = null;
  numero: string = null;
  produto: number = null;
  descricao: string = null;
  quantidade: number = null;
  data: Date = null;
  situacao: string = StatusPagamentoEnum.PENDENTE;
  valor: number = null;
  cliente: number = null;
}
