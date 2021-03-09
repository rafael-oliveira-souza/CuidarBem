import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export class Cartao {
  titulo?: string;
  descricao: string;
  imagem: string;
  valor: number = 0;
  situacao?: SituacaoProdutoEnum = SituacaoProdutoEnum.DISPONIVEL;
}
