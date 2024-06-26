import { Imovel } from "./imovel"
import { Inquilino } from "./inquilino"

export class Aluguel{
  id: number
  dataCheckin: Date
  dataCheckoutPrevisto: Date
  dataCheckoutEfetivo?: Date
  valorTotal: number = 0
  valorDiaria: number
  valorLimpeza: number
  valorMulta: number
  qtdDias: number = 0
  imovel: Imovel
  inquilino: Inquilino
}
