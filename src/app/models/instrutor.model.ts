export class Instrutor {
  numeroBreve: string;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numeroMatricula: string;
  nomeCurso: string;
  instituicaoCurso: string;
  dataObtencaoDiploma: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
