import { SituacaoProdutoEnum } from "../enums/SituacaoProdutoEnum";

export const Mocks = {
  Cartoes: [
    {
      descricao: "Abelha follow...",
      imagem: "/assets/images/logo-okipoki_p.jpg",
      valor: 60,
      situacao: SituacaoProdutoEnum.DISPONIVEL,
    },
    {
      descricao: "Andador 3 em 1 com Luz...",
      imagem: "/assets/images/abelha.jpg",
      valor: 180,
      situacao: SituacaoProdutoEnum.DISPONIVEL,
    },
  ],
  Produtos: [
    {
      id: 1,
      nome: "Abelha",
      descricao: "Abelha follow...",
      valor: 60,
      cor: "",
      estoque: 3,
      imagem: "/assets/images/abelha.jpg",
    },
    {
      id: 2,
      nome: "Pula Pula",
      descricao: "Pula Pula",
      valor: 160,
      imagem: "/assets/images/abelha.jpg",
      cor: "",
      estoque: 5,
    },
  ],
};
