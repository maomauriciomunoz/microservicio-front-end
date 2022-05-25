import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AlumnosComponent} from "./components/alumnos/alumnos.component";
import {CursosComponent} from "./components/cursos/cursos.component";
import {ExamenesComponent} from "./components/examenes/examenes.component";
import {AlumnosFormComponent} from "./components/alumnos/alumnos-form.component";
import {CursosFormComponent} from "./components/cursos/cursos-form.component";
import {ExamenesFormComponent} from "./components/examenes/examenes-form-component";
import {AsignarAlumnosComponent} from "./components/cursos/asignar-alumnos.component";
import {AsignarExamenesComponent} from "./components/cursos/asignar-examenes.component";
import {ResponderExamenComponent} from "./components/alumnos/responder-examen.component";


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'cursos'},  //si no se pone nada en la url redirige a cursos
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: AlumnosFormComponent},
  {path: 'alumnos/form/:id', component: AlumnosFormComponent},  //enrutado para editar por id
  {path: 'cursos', component: CursosComponent},
  {path: 'cursos/form', component: CursosFormComponent},
  {path: 'cursos/form/:id', component: CursosFormComponent},  //enrutado para editar por id
  {path: 'examenes', component: ExamenesComponent},
  {path: 'examenes/form', component: ExamenesFormComponent},
  {path: 'examenes/form/:id', component: ExamenesFormComponent},  //enrutado para editar por id
  {path: 'cursos/asignar-alumnos/:id', component: AsignarAlumnosComponent},
  {path: 'cursos/asignar-examenes/:id', component: AsignarExamenesComponent},
  {path: 'alumnos/responder-examen/:id', component: ResponderExamenComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
