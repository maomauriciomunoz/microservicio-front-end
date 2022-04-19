export class Asignatura {
  ib: number;
  nombre: string;
  padre: Asignatura;
  hijos: Asignatura[] = [];
}
