import {Injectable} from '@angular/core';
import {BASE_ENDPOINT} from "../config/app";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Curso} from "../models/curso";
import {Examen} from "../models/examen";
import {Asignatura} from "../models/asignatura";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  // private baseEndpoint = 'http://localhost:8090/api/cursos';
  private baseEndpoint = BASE_ENDPOINT + '/examenes';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }


  public listar(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.baseEndpoint);
  }

  //metodo para la paginacion
  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/paginable`, {params: params});
  }

  public crear(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.baseEndpoint, examen, {headers: this.cabeceras});
  }

  //encuentra el curso por id
  public ver(id: number): Observable<Examen> {
    return this.http.get<Examen>(this.baseEndpoint + '/' + id);
  }

  public editar(examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(this.baseEndpoint + '/' + examen.id, examen, {headers: this.cabeceras});
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.baseEndpoint + '/' + id);
  }

  public findAllAsignatura(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseEndpoint}/asignaturas`);
  }

  public filtrarPorNombre(nombre: string): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }


}
