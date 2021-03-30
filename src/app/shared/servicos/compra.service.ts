import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ObjetoEnvio } from "../models/classes/ObjetoEnvio";
import { Pacote } from "../models/classes/Pacote";
import { Produto } from "../models/classes/Produto";
import { Mocks } from "../models/constantes/Mocks";
import { MensagemEnum } from "../models/enums/MensagemEnum";
import { SituacaoProdutoEnum } from "../models/enums/SituacaoProdutoEnum";
import { StorageEnum } from "../models/enums/StorageEnum";
import { AlertaService } from "./alerta.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class CompraService {
  private objectSource = new BehaviorSubject(new ObjetoEnvio());
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _storageService: StorageService,
    private _alertaService: AlertaService
  ) {}

  public getObjetoEnvio(): Observable<ObjetoEnvio> {
    return this.observableObject;
  }

  public salvarCarrinho(objetoEnvio: ObjetoEnvio): void {
    this._storageService.setItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO,
      objetoEnvio
    );

    this.objectSource.next(objetoEnvio);
  }

  public carregarCarrinho(): ObjetoEnvio {
    let objEnvio: ObjetoEnvio = this._storageService.getItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO
    );
    return objEnvio;
  }

  public adicionarCarrinnho(
    objetoEnvio: ObjetoEnvio,
    produto: Produto
  ): boolean {
    if (objetoEnvio == null) {
      objetoEnvio = new ObjetoEnvio();
    }

    if (produto.situacao != SituacaoProdutoEnum.INDISPONIVEL) {
      let produtoNoCarrinho: boolean = this.atualizarProdutoCarrinho(
        objetoEnvio,
        produto
      );

      if (produtoNoCarrinho) {
        this._alertaService.alerta(MensagemEnum.PRODUTO_EXISTE_CARRINHO);
        return false;
      } else {
        produto.quantidade =
          produto.quantidade < produto.estoque
            ? produto.quantidade++
            : produto.quantidade;

        objetoEnvio.produtos.push(produto);
        this.salvarCarrinho(objetoEnvio);
        this._alertaService.sucesso(MensagemEnum.PRODUTO_ADD_CARRINHO);
        return true;
      }
    } else {
      this._alertaService.alerta(MensagemEnum.PRODUTO_INDISPONIVEL);
    }
  }

  //retorna true se o produto for atualizado
  public atualizarProdutoCarrinho(
    objetoEnvio: ObjetoEnvio,
    produto: Produto
  ): boolean {
    if (objetoEnvio == null) {
      objetoEnvio = new ObjetoEnvio();
    }

    let produtoNoCarrinho: boolean = false;

    objetoEnvio.produtos.forEach((prod: Produto, index: number) => {
      if (produto.id == prod.id) {
        prod = produto;
        objetoEnvio.produtos[index] = produto;
        produtoNoCarrinho = true;
        this.salvarCarrinho(objetoEnvio);
      }
    });

    return produtoNoCarrinho;
  }

  public removerProdutoCarrinho(
    objetoEnvio: ObjetoEnvio,
    produto: Produto
  ): void {
    if (objetoEnvio == null) {
      objetoEnvio = new ObjetoEnvio();
    }

    objetoEnvio.produtos.forEach((prod: Produto, index: number) => {
      if (produto.id == prod.id) {
        objetoEnvio.produtos.splice(index, 1);
        this.salvarCarrinho(objetoEnvio);
      }
    });
  }
}
