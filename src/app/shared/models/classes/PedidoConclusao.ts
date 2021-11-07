import { PerfilEnum } from "../enums/PerfilEnum";
import { Email } from "./Email";
import { Pedido } from "./Pedido";

export class PedidoConclusao {
  email: Email = null;
  pedidos: Array<Pedido> = new Array<Pedido>();
}
