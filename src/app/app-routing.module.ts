import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AlumnosComponent} from "./components/alumnos/alumnos.component";
import {CursosComponent} from "./components/cursos/cursos.component";
import {ExamenesComponent} from "./components/examenes/examenes.component";
import {AlumnosFormComponent} from "./components/alumnos/alumnos-form.component";


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'cursos'},  //si no se pone nada en la url redirige a cursos
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: AlumnosFormComponent},
  {path: 'alumnos/form/:id', component: AlumnosFormComponent},  //enrutado para editar por id
  {path: 'cursos', component: CursosComponent},
  {path: 'examenes', component: ExamenesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
