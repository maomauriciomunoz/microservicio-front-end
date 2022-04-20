import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BASE_ENDPOINT} from "../config/app";
import {Observable} from "rxjs";
import {Alumno} from "../models/alumno";
import {Curso} from "../models/curso";

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  // private baseEndpoint = 'http://localhost:8090/api/cursos';
  private baseEndpoint = BASE_ENDPOINT + '/cursos';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }



  public listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseEndpoint);
  }

  //metodo para la paginacion
  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/paginable`, {params: params});
  }


  public crear(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.baseEndpoint, curso, {headers: this.cabeceras});
  }

  //encuentra el curso por id
  public ver(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.baseEndpoint + '/' + id);
  }

  public editar(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(this.baseEndpoint + '/' + curso.id, curso, {headers: this.cabeceras});
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.baseEndpoint + '/' + id);
  }
}
