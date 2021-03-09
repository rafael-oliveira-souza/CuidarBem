import { CategoriaProdutoEnum } from "../enums/CategoriaProdutoEnum";
import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";
import { EnumUtilsConstants } from "./EnumUtilsConstante";

export const ProdutoUtilsConstants = {
  getNomeCategoria(categoria: number): string {
    return EnumUtilsConstants.getNameByValue(categoria, CategoriaProdutoEnum);
  },

  getSituacaoEstoque(situacao: number): string {
    return EnumUtilsConstants.getNameByValue(situacao, SituacaoProdutoEnum);
  },

  getCorSituacaoEstoque(situacao: number) {
    if (situacao == SituacaoProdutoEnum.DISPONIVEL) {
      return "success";
    } else if (situacao == SituacaoProdutoEnum.INDISPONIVEL) {
      return "danger";
    } else {
      return "warning";
    }
  },
};
