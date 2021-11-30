import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";
import { Imagem } from "./Imagem";
import { Pacote } from "./Pacote";

export class Produto {
  public id: number = null;
  public descricao: string = null;
  public nome: string = null;
  public valor: number = null;
  public pacotes: Pacote[] = [];
  public imagens: Imagem[] = [];
  public estoque: number = null;
  public avaliacao: number = 5;
  public faixa_etaria: number = null;
  public quantidade: number = null;
  public categoria: number = null;
  public situacao: number = SituacaoProdutoEnum.DISPONIVEL;
}
