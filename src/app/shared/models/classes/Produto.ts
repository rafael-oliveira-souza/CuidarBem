import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export class Produto {
  id: number;
  imagem: string;
  descricao: string;
  nome: string;
  valor: number;
  estoque: number;
  cor: string;
  avaliacao: number;
  situacao: number;
  categoria: number;
}
