export class Aluno {
  numeroBreve: string;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numeroMatricula: number;
  horasTotais: number;

  constructor(values?: object) {
    Object.assign(this, values);
  }
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
