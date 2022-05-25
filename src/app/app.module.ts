import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AlumnosComponent} from './components/alumnos/alumnos.component';
import {CursosComponent} from './components/cursos/cursos.component';
import {ExamenesComponent} from './components/examenes/examenes.component';
import {AppRoutingModule} from "./app-routing.module";
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {AlumnosFormComponent} from './components/alumnos/alumnos-form.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CursosFormComponent} from './components/cursos/cursos-form.component';
import {ExamenesFormComponent} from './components/examenes/examenes-form-component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {AsignarAlumnosComponent} from './components/cursos/asignar-alumnos.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';
import { ResponderExamenModalComponent } from './components/alumnos/responder-examen-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { VerExamenModalComponent } from './components/alumnos/ver-examen-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    AlumnosFormComponent,
    CursosFormComponent,
    ExamenesFormComponent,
    AsignarAlumnosComponent,
    AsignarExamenesComponent,
    ResponderExamenComponent,
    ResponderExamenModalComponent,
    VerExamenModalComponent
  ],
  entryComponents: [ResponderExamenModalComponent, VerExamenModalComponent],

  // aqui se importan todos los modulos -->
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
