import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export class Produto {
  public id: number = null;
  public imagem: string = null;
  public descricao: string = null;
  public nome: string = null;
  public valor: number = null;
  public pacote: number = 1;
  public estoque: number = null;
  public avaliacao: number = 5;
  public faixaEtaria: number = 0;
  public quantidade: number = 0;
  public categoria: number = null;
  public situacao: number = SituacaoProdutoEnum.DISPONIVEL;
}
