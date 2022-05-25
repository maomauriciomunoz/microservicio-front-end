import {Component, OnInit, ViewChild} from '@angular/core';
import {BASE_ENDPOINT} from "../../config/app";
import {ExamenService} from "../../services/examen.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Examen} from "../../models/examen";
import {Curso} from "../../models/curso";
import Swal from "sweetalert2";

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {

  public titulo: string = 'Listado de Examenes';
  examenes: Examen[];   //creamos una lista de tipo Curso
  baseEndpoint = BASE_ENDPOINT + '/examenes';

  //atributos para el paginador
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [1, 3, 5, 10, 25, 100];


  constructor(private examenService: ExamenService) {
  }

  ngOnInit(): void {
    this.calcularRangos();
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
    this.examenService.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(examenes => {
      this.examenes = examenes.content as Examen[];
      this.totalRegistros = examenes.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por Pagina';
    });
  }

  //elimina un curso por su id
  public eliminar(examen: Examen): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'ELIMINAR',
      text: 'Seguro deseas eliminar el examen: ${examen.nombre} ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminar(examen.id).subscribe(() => {
          this.calcularRangos();
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          //this.alumnoService.listar().subscribe(alumnos => {
          //this.alumnos = alumnos
          //});
          //alert(`Alumno ${alumno.nombre} eliminado con exito`);
          Swal.fire('Eliminado: ', `Examen ${examen.nombre} eliminado con exito`, 'success');

        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El examen NO sera eliminado',
          'error'
        )
      }
    })
  }

}
