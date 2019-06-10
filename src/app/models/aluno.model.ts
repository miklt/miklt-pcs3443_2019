export class Aluno {
  numeroBreve: string;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numeroMatricula: number;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
