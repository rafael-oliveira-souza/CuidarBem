import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export class Produto {
  id: number;
  imagem: string;
  descricao: string;
  nome: string;
  valor: number;
  estoque: number;
  cor: string;
  avaliacao: number = 5;
  categoria: number;
  quantidade: number = 0;
  situacao: number = SituacaoProdutoEnum.DISPONIVEL;

  constructor() {}
}
