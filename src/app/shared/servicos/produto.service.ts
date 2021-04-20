import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Categoria } from "../models/classes/Categoria";
import { ImagemProduto } from "../models/classes/ImagemProduto";
import { Pacote } from "../models/classes/Pacote";
import { Produto } from "../models/classes/Produto";
import { EnumUtilsConstants } from "../models/constantes/EnumUtilsConstante";
import { SituacaoProdutoEnum } from "../models/enums/SituacaoProdutoEnum";
import { CategoriaService } from "./categoria.service";
import { LocacaoService } from "./locacao.service";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();
  private pacotes: Pacote[] = [];

  constructor(
    private _locacaoServiceo: LocacaoService,
    private _categoriaService: CategoriaService,
    private _http: HttpClient
  ) {
    this._locacaoServiceo.getPacotes().subscribe((pacotes: Pacote[]) => {
      this.pacotes = pacotes;
    });
  }

  public getProdutos() {
    return this._http.get<Array<Produto>>(
      `${environment.apiServer}/produto/todos`
    );
  }

  public removeProdutoById(id: number) {
    return this._http.delete<any>(
      `${environment.apiServer}/produto/excluir?id=${id}`
    );
  }

  public getNomeCategoria(categoria: number): Observable<Categoria> {
    return this._categoriaService.getCategoriaById(categoria);
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

  public getValorTotalProdutos(produtos: Produto[], pacotes: Pacote[]): number {
    let total: number = 0;

    if (produtos) {
      produtos.forEach((prod: Produto) => {
        // let qtd: number = prod.quantidade > 0 ? prod.quantidade : 1;
        let valorPacote = this.getValorPacote(prod, pacotes);
        total += valorPacote * prod.valor * prod.quantidade;
      });
    }

    return total;
  }

  public getValorPacote(produto: Produto, pacotes: Pacote[]): number {
    let valorPacote: number = 0;

    pacotes.forEach((pacote: Pacote) => {
      if (pacote.id == produto.locacao) {
        valorPacote = pacote.pct_desconto;
      }
    });

    return valorPacote;
  }

  public getImagensProdutos(): Observable<Array<ImagemProduto>> {
    return this._http.get<Array<ImagemProduto>>(
      `${environment.apiServer}/produto/imagens/todos`
    );
  }
}
