import {Component, OnInit} from '@angular/core';
import {Alumno} from "../../models/alumno";
import {AlumnoService} from "../../services/alumno.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {

  public titulo: string = "Formulario Alumno";

  alumno: Alumno = new Alumno();

  error: any;


  //alumnoService es una instancia de AlumnoService
  constructor(private alumnoService: AlumnoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //si el id del alumno existe invca el metodo ver de alumno.service y pobla los datos en el formulario para ser editados
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.alumnoService.ver(id).subscribe(alumno => this.alumno = alumno);
      }
    })
  }

  //metodo que se invoca en el boton del formulario con   (clic)="crear()"
  public crear(): void {
    this.alumnoService.crear(this.alumno).subscribe(alumno => {
        console.log(alumno);
        //alert(`Alumno ${alumno.nombre} creado con Exito`);
        Swal.fire('Nuevo: ', `Alumno ${alumno.nombre} creado con Exito`, 'success');
        this.router.navigate(['/alumnos']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
  }

  //metodo que se invoca en el boton del formulario con   (clic)="editar()"
  public editar(): void {
    this.alumnoService.editar(this.alumno).subscribe(alumno => {
        console.log(alumno);
        //alert(`Alumno ${alumno.nombre} Actualizado con Exito`);
        Swal.fire('Modificado: ', `Alumno ${alumno.nombre} Actualizado con Exito`, 'success');
        this.router.navigate(['/alumnos']);
      }, //codigo para capturar los errores desde el backend
      err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      });
  }



}
