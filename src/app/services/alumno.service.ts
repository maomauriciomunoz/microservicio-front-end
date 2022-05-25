import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Alumno} from "../models/alumno";
import {BASE_ENDPOINT} from "../config/app";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  // private baseEndpoint = 'http://localhost:8090/api/alumnos';
  private baseEndpoint = BASE_ENDPOINT + '/alumnos';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  public listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseEndpoint);
  }

  //metodo para la paginacion
  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/paginable`, {params: params});
  }


  //encuentra el alumno por id
  public ver(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.baseEndpoint + '/' + id);
  }

  public crear(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.baseEndpoint, alumno, {headers: this.cabeceras});
  }

  public editar(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.baseEndpoint + '/' + alumno.id, alumno, {headers: this.cabeceras});
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.baseEndpoint + '/' + id);
  }

  public crearConFoto(alumno: Alumno, archivo: File): Observable<Alumno>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.post<Alumno>(this.baseEndpoint + '/crearConFoto', formData);

  }

  public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.put<Alumno>(`${this.baseEndpoint}/editarConFoto/${alumno.id}`, formData);

  }

  public filtrarPorNombre(nombre: string): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }


  //otra forma de hacer el listar

  // public listar(): Observable<Alumno[]>{
  //   return this.http.get(this.baseEndpoint).pipe(
  //     map(alumnos => alumnos as Alumno[])
  //   );
  // }
}
