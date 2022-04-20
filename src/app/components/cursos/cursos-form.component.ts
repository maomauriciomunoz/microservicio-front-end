import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {CursoService} from "../../services/curso.service";
import {Curso} from "../../models/curso";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {
  curso: Curso = new Curso();
  error: any;

  constructor(private cursoService: CursoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //si el id del alumno existe invca el metodo ver de alumno.service y pobla los datos en el formulario para ser editados
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.cursoService.ver(id).subscribe(curso => this.curso = curso);
      }
    })
  }

  //metodo que se invoca en el boton del formulario con   (clic)="crear()"
  public crear(): void {
    this.cursoService.crear(this.curso).subscribe(curso => {
        console.log(curso);
        //alert(`Curso ${curso.nombre} creado con Exito`);
        Swal.fire('Nuevo: ', `Curso ${curso.nombre} creado con Exito`, 'success');
        this.router.navigate(['/cursos']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });

  }

  public editar(): void {
    this.cursoService.editar(this.curso).subscribe(curso => {
        console.log(curso);
        //alert(`Alumno ${alumno.nombre} creado con Exito`);
        Swal.fire('Modificado: ', `Curso ${curso.nombre} editado con Exito`, 'success');
        this.router.navigate(['/cursos']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
  }

}
