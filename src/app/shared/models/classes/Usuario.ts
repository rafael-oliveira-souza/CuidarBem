import { PerfilEnum } from "../enums/PerfilEnum";

export class Usuario {
  id: number = null;
  email: string = null;
  senha: string = null;
  perfil: PerfilEnum = PerfilEnum.CLIENTE;
}

export class UsuarioTrocaSenha {
  email: string = null;
  senhaAtual: string = null;
  senhaNova: string = null;
}
