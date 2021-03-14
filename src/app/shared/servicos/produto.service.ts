import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Pacote } from "../models/classes/Pacote";
import { Produto } from "../models/classes/Produto";
import { EnumUtilsConstants } from "../models/constantes/EnumUtilsConstante";
import { Mocks } from "../models/constantes/Mocks";
import { CategoriaProdutoEnum } from "../models/enums/CategoriaProdutoEnum";
import { SituacaoProdutoEnum } from "../models/enums/SituacaoProdutoEnum";
import { LocacaoService } from "./locacao.service";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();
  private pacotes: Pacote[] = [];

  constructor(private _locacaoServiceo: LocacaoService) {
    this._locacaoServiceo.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
    });
  }

  public getProdutos(): Observable<Array<Produto>> {
    this.objectSource.next(Mocks.Produtos);

    return this.observableObject;
  }

  public getNomeCategoria(categoria: number): string {
    return EnumUtilsConstants.getNameByValue(categoria, CategoriaProdutoEnum);
  }

  public getSituacaoEstoque(situacao: number): string {
    return EnumUtilsConstants.getNameByValue(situacao, SituacaoProdutoEnum);
  }

  public getCorSituacaoEstoque(situacao: number) {
    if (situacao == SituacaoProdutoEnum.DISPONIVEL) {
      return "success";
    } else if (situacao == SituacaoProdutoEnum.INDISPONIVEL) {
      return "danger";
    } else {
      return "warning";
    }
  }

  public getValorTotalProdutos(produtos: Array<Produto>): number {
    let total: number = 0;

    produtos.forEach((prod: Produto) => {
      let qtd: number = prod.quantidade > 0 ? prod.quantidade : 1;
      let valorPacote = this.getValorPacote(prod);
      total += valorPacote * prod.valor * qtd;
    });

    return total;
  }

  public getValorPacote(produto: Produto): number {
    let valorPacote: number = 0;

    this.pacotes.forEach((pacote: Pacote) => {
      if (pacote.id == produto.pacote) {
        valorPacote = pacote.porcentagemDesconto;
      }
    });

    return valorPacote;
  }
}
