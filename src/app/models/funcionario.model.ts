export class Funcionario {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
