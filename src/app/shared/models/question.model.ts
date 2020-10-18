export interface Ano {
 id: number
 ano: string
}
export interface Banca {
 id: number;
 banca: string;
}
export interface Instituicao {
 id: number;
 instituicao: string;
}
export interface Disciplina {
 id: number;
 disciplina: string;
}
export interface Nivel {
 id: number;
 nivel: string;
}

export interface Item {
  item: string;
  valor: string;
}

export interface Questao {
  id: number;
  ano: Ano;
  banca: Banca;
  instituicao: Instituicao;
  disciplina: Disciplina;
  nivel: Nivel;
  itens: Item[];
  questao: string;
  reposta: Item;
}