import {Component, OnInit, ViewChild} from '@angular/core';
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";
import {filter} from "rxjs";
import Swal from 'sweetalert2'
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public titulo: string = 'Listado de Alumnos';
  alumnos: Alumno[];   //creamos una lista de tipo Alumno

  //atributos para el paginador
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];


  constructor(private alumnoService: AlumnoService) {
  }

  //ngOnInit ejecuta lo que hay adentro al momento de inicializar la aplicacion, en esta oportunidad el metodo de listar alumnos
  ngOnInit() {
    this.calcularRangos();
    //este es el codigo para listar cuando no tiene paginacion
    /*this.alumnoService.listar().subscribe(alumnos => {
      this.alumnos = alumnos.content as Alumno[];*/
  }

  //metodo para el paginador
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();

  }

  //metodo para el paginador
  private calcularRangos() {
    this.alumnoService.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(alumnos => {
      this.alumnos = alumnos.content as Alumno[];
      this.totalRegistros = alumnos.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por Pagina';
    });
  }

  // codigo para el paginador
  @ViewChild(MatPaginator) paginator: MatPaginator;


  //elimina un alumno por su id
  public eliminar(alumno: Alumno): void {
    Swal.fire({
      title: 'Cuidado: ',
      text: '¿Seguro que desea eliminar el Alumno : ${alumno.nombre} ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminar(alumno.id).subscribe(() => {
          this.calcularRangos();
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          //this.alumnoService.listar().subscribe(alumnos => {
          //this.alumnos = alumnos
          //});
          //alert(`Alumno ${alumno.nombre} eliminado con exito`);
          Swal.fire('Eliminado: ', `Alumno ${alumno.nombre} eliminado con exito`, 'success');

        });
      }
    });
  }

  //elimina un alumno por su id
  public eliminar2(alumno: Alumno): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'ELIMINAR',
      text: 'Seguro deseas eliminar al alumno: ${alumno.nombre} ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminar(alumno.id).subscribe(() => {
          this.calcularRangos();
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          //this.alumnoService.listar().subscribe(alumnos => {
          //this.alumnos = alumnos
          //});
          //alert(`Alumno ${alumno.nombre} eliminado con exito`);
          Swal.fire('Eliminado: ', `Alumno ${alumno.nombre} eliminado con exito`, 'success');

        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El alumno NO sera eliminado',
          'error'
        )
      }
    })
  }

}
