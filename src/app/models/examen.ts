import {Pregunta} from "./pregunta";
import {Asignatura} from "./asignatura";

export class Examen {

  id: number;
  nombre: string;
  createAt: string;
  preguntas: Pregunta[] = [];
  asignaturaPadre: Asignatura;
  asignaturaHija: Asignatura;
  respondido: boolean;
}
