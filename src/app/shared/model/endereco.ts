import { Anfitriao } from "./anfitriao"

export class Endereco{
  id: number
  numero: number
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
  pais: string = "BR"
  anfitriao: Anfitriao
}


