import { PerfilEnum } from "../enums/PerfilEnum";

export class Usuario {
  id: number = null;
  email: string = null;
  senha: string = null;
  perfil: PerfilEnum = PerfilEnum.CLIENTE;
}
