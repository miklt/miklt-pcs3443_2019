export class Voo {
  id: number;
  data: string;
  horarioSaida: string;
  horarioChegada: string;
  parecer: number;
  aluno: number;
  instrutor: number;
  dadosInstrutor: any;
  dadosAluno: any;
  constructor(obj?: object) {
    Object.assign(this, obj);
  }
  getTempoDeVoo() {
    const saida = new Date();
    const chegada = new Date();
    chegada.setHours(Number(this.horarioChegada.slice(0, 2)), Number(this.horarioChegada.slice(2, 4)));
    saida.setHours(Number(this.horarioSaida.slice(0, 2)), Number(this.horarioSaida.slice(2, 4)));
    return ((Number(chegada) - Number(saida)) / (1000 * 60)).toFixed(0);
  }
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
