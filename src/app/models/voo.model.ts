export class Voo {
  id: number;
  data: string;
  horarioSaida: string;
  horarioChegada: string;
  parecer: number;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
