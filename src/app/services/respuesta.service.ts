import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Respuesta} from "../models/respuesta";
import {Observable} from "rxjs";
import {BASE_ENDPOINT} from "../config/app";
import {Alumno} from "../models/alumno";
import {Examen} from "../models/examen";

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  private baseEndpoint = BASE_ENDPOINT + '/respuestas';


  crear(respuestas: Respuesta[]): Observable<Respuesta[]> {
    return this.http.post<Respuesta[]>(this.baseEndpoint, respuestas, {headers: this.cabeceras});
  }

  obtenerRespuestaPorAlumnoYExamen(alumno: Alumno, examen: Examen): Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(`${this.baseEndpoint}/alumno/${alumno.id}/examen/${examen.id}`);
  }
}
