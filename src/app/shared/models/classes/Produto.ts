import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export class Produto {
  public id: number = null;
  public descricao: string = null;
  public nome: string = null;
  public valor: number = null;
  public pacote: number = null;
  public estoque: number = null;
  public avaliacao: number = 5;
  public faixa_etaria: number = null;
  public quantidade: number = null;
  public categoria: number = null;
  public situacao: number = SituacaoProdutoEnum.DISPONIVEL;
  public diretorioImagens: string = null;
  public imagem: string = null;
}
