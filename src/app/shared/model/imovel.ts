import { Anfitriao } from './anfitriao';
import { Endereco } from './endereco';

export class Imovel{
  id: number
  nome: string
  tipo: number
  capacidadePessoas: number
  qtdQuarto: number
  qtdCama: number
  qtdBanheiro: number
  descricao: string
  isOcupado: boolean
  endereco: Endereco
  anfitriao: Anfitriao
}
