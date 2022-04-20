import {Component, OnInit, ViewChild} from '@angular/core';
import {BASE_ENDPOINT} from "../../config/app";
import {Curso} from "../../models/curso";
import {CursoService} from "../../services/curso.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Alumno} from "../../models/alumno";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public titulo: string = 'Listado de Cursos';
  cursos: Curso[];   //creamos una lista de tipo Curso
  baseEndpoint = BASE_ENDPOINT + '/cursos';

  //atributos para el paginador
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [1, 3, 5, 10, 25, 100];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.calcularRangos();
    /*this.cursoService.listar().subscribe(cursos => {
      this.cursos = cursos;
    });*/

  }

  // codigo para el paginador
  @ViewChild(MatPaginator) paginator: MatPaginator;


  //metodo para el paginador
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();

  }

  //metodo para el paginador
  private calcularRangos() {
    this.cursoService.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(cursos => {
      this.cursos = cursos.content as Curso[];
      this.totalRegistros = cursos.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por Pagina';
    });
  }


  //elimina un curso por su id
  public eliminar(curso: Curso): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'ELIMINAR',
      text: 'Seguro deseas eliminar el curso: ${curso.nombre} ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.eliminar(curso.id).subscribe(() => {
          this.calcularRangos();
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          //this.alumnoService.listar().subscribe(alumnos => {
          //this.alumnos = alumnos
          //});
          //alert(`Alumno ${alumno.nombre} eliminado con exito`);
          Swal.fire('Eliminado: ', `Curso ${curso.nombre} eliminado con exito`, 'success');

        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El curso NO sera eliminado',
          'error'
        )
      }
    })
  }

}
