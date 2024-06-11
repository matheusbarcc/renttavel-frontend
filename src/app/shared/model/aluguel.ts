import { Imovel } from "./imovel"
import { Inquilino } from "./inquilino"

export class Aluguel{
  id: number
  dataCheckin: Date
  dataCheckoutPrevisto: Date
  dataCheckoutEfetivo: Date
  valorTotal: number
  valorDiaria: number
  valorLimpeza: number
  valorMulta: number
  qtdDias: number
  imovel: Imovel
  inquilino: Inquilino
}
