import { BaseSeletor } from "./base.seletor";

export class AluguelSeletor extends BaseSeletor {
  dataCheckinInicio?: Date;
  dataCheckinFinal: Date;
  dataCheckoutPrevistoInicio: Date;
  dataCheckoutPrevistoFinal: Date;
  dataCheckoutEfetivoInicio: Date;
  dataCheckoutEfetivoFinal?: Date;
  valorTotalMin?: number;
  valorTotalMax?: number;
  valorDiariaMin: number;
  valorDiariaMax: number;
  valorLimpezaMin: number;
  valorLimpezaMax: number;
  valorMultaMin: number;
  valorMultaMax: number;
  qtdDiasMin: number;
  qtdDiasMax: number;
  idImovel: number;
  idInquilino: number;
  idAnfitriao: number;
}
