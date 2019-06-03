export class Aluno {
  numeroBreve: string;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numeroMatricula: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
