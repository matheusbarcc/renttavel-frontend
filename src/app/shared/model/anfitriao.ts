import { PerfilAcesso } from "./perfilAcesso";

export class Anfitriao {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfilAcesso: PerfilAcesso = PerfilAcesso.ANFITRIAO;
  idSessao: string;
}
