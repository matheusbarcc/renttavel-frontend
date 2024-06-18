import { BaseSeletor } from "./base.seletor";

export class EnderecoSeletor extends BaseSeletor{
  numero: number;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}
