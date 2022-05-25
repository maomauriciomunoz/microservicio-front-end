import {Component, OnInit} from '@angular/core';
import {Examen} from "../../models/examen";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamenService} from "../../services/examen.service";
import Swal from "sweetalert2";
import {Asignatura} from "../../models/asignatura";
import {Pregunta} from "../../models/pregunta";

@Component({
  selector: 'app-examenes-form-component',
  templateUrl: './examenes-form-component.html',
  styleUrls: ['./examenes-form-component.css']
})
export class ExamenesFormComponent implements OnInit {

  examen: Examen = new Examen();
  error: any;
  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];
  errorPreguntas: string;

  constructor(private examenService: ExamenService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    //si el id del examen existe invoca el metodo ver de alumno.service y pobla los datos en el formulario para ser editados
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.examenService.ver(id).subscribe(examen => {
          this.examen = examen;
          this.cargarHijos();
        });
      }
    });
    //devuelve todas las asignaturas pero las filtra por aquellas que no tienen asignada padre en la BD
    this.examenService.findAllAsignatura().subscribe(asignaturas => this.asignaturasPadre = asignaturas.filter(a => !a.padre));
  }


  //metodo que se invoca en el boton del formulario con   (clic)="crear()"
  public crear(): void {
    if (this.examen.preguntas.length == 0){
      //Swal.fire("Error","El examen debe contener preguntas!", "error");
      this.errorPreguntas = "El examen debe tener preguntas!";
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    this.examenService.crear(this.examen).subscribe(examen => {
        console.log(examen);
        //alert(`Curso ${curso.nombre} creado con Exito`);
        Swal.fire('Nuevo: ', `examen ${examen.nombre} creado con Exito`, 'success');
        this.router.navigate(['/examenes']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
  }

  public editar(): void {
    if (this.examen.preguntas.length == 0){
      //Swal.fire("Error","El examen debe contener preguntas!", "error");
      this.errorPreguntas = "El examen debe tener preguntas!";
      return;
    }
    this.errorPreguntas = undefined;
    this.eliminarPreguntasVacias();
    this.examenService.editar(this.examen).subscribe(examen => {
        console.log(examen);
        //alert(`Alumno ${alumno.nombre} creado con Exito`);
        Swal.fire('Modificado: ', `Examen ${examen.nombre} editado con Exito`, 'success');
        this.router.navigate(['/examenes']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
  }

  //metodo que se invoca en el formulario de examen en el combobox de asignaturaPadre
  cargarHijos(): void {
    this.asignaturasHija = this.examen.asignaturaPadre ? this.examen.asignaturaPadre.hijos : [];  //si ya se selecciono el padre cargue las hijas
  }


  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {
    if (a1 === undefined && a2 === undefined) {
      return true;
    }

    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined) ? false : a1.ib === a2.ib;
  }

  //agrega un campo en el array preguntas (atributo de la clase Examen.ts)
  agregarPregunta(): void {
    this.examen.preguntas.push(new Pregunta());
  }

  //asigna un string al atributo texto de la clase Pregunta.ts
  asignarTexto(pregunta: Pregunta, event: any): void {
    pregunta.texto = event.target.value as string;
    console.log(this.examen);
  }

  //filtra por el texto de la pregunta que le pasamos en el atributo del metodo
  eliminarPregunta(pregunta): void {
    this.examen.preguntas = this.examen.preguntas.filter(p => pregunta.texto !== p.texto);
  }

  eliminarPreguntasVacias(): void{
    this.examen.preguntas = this.examen.preguntas.filter(p => p.texto != null && p.texto.length > 0);
  }

}
