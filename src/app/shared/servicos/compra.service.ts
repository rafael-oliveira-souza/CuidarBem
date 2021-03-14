import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ObjetoEnvio } from "../models/classes/ObjetoEnvio";
import { Pacote } from "../models/classes/Pacote";
import { Produto } from "../models/classes/Produto";
import { Mocks } from "../models/constantes/Mocks";
import { MensagemEnum } from "../models/enums/MensagemEnum";
import { StorageEnum } from "../models/enums/StorageEnum";
import { AlertaService } from "./alerta.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class CompraService {
  private objectSource = new BehaviorSubject([]);
  private observableObject = this.objectSource.asObservable();

  constructor(
    private _storageService: StorageService,
    private _alertaService: AlertaService
  ) {}

  public salvarCarrinho(objetoEnvio: ObjetoEnvio): void {
    this._storageService.setItem<ObjetoEnvio>(
      StorageEnum.OBJETO_ENVIO,
      objetoEnvio
    );
  }

  public carregarCarrinho(): Observable<ObjetoEnvio> {
    return this._storageService.getItem<ObjetoEnvio>(StorageEnum.OBJETO_ENVIO);
  }

  public adicionarCarrinnho(
    objetoEnvio: ObjetoEnvio,
    produto: Produto
  ): boolean {
    let produtoNoCarrinho: boolean = this.atualizarProdutoCarrinho(
      objetoEnvio,
      produto
    );

    if (produtoNoCarrinho) {
      this._alertaService.alerta(MensagemEnum.PRODUTO_EXISTE_CARRINHO);
      return false;
    } else {
      produto.quantidade++;
      objetoEnvio.produtos.push(produto);
      this.salvarCarrinho(objetoEnvio);
      this._alertaService.sucesso(MensagemEnum.PRODUTO_ADD_CARRINHO);
      return true;
    }
  }

  //retorna true se o produto for atualizado
  public atualizarProdutoCarrinho(
    objetoEnvio: ObjetoEnvio,
    produto: Produto
  ): boolean {
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
    objetoEnvio.produtos.forEach((prod: Produto, index: number) => {
      if (produto.id == prod.id) {
        objetoEnvio.produtos.splice(index, 1);
        this.salvarCarrinho(objetoEnvio);
      }
    });
  }
}
