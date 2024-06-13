import { BaseSeletor } from "./base.seletor";

export class ImovelSeletor extends BaseSeletor{
  nome: string;
  tipo: number;
  capacidadePessoas: number;
  qtdQuarto: number;
  qtdCama: number;
  qtdBanheiro: number;
  isOcupado: boolean;
  idEndereco: number;
}
