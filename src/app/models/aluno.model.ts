import { Voo } from './voo.model';

export class Aluno {
  numeroBreve: string;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numeroMatricula: number;
  horasTotais: number;
  voos?: Voo[];

  constructor(values?: object) {
    Object.assign(this, values);
  }
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
