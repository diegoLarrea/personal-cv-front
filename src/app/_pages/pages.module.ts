import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { VerEmpleoComponent } from './empleo/ver-empleo/ver-empleo.component';
import { ListarEmpleoComponent } from './empleo/listar-empleo/listar-empleo.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { ListarProcesoComponent } from './proceso/listar-proceso/listar-proceso.component';
import { AgregarEmpleoComponent } from './empleo/agregar-empleo/agregar-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo/editar-empleo.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { AgregarUsuarioComponent } from './usuario/agregar-usuario/agregar-usuario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { HomePipe } from './home/home.pipe';
import { DatosPersonalesComponent } from './cargar-cv/datos-personales/datos-personales.component';
import { EducacionComponent } from './cargar-cv/educacion/educacion.component';
import { IdiomasComponent } from './cargar-cv/idiomas/idiomas.component';
import { ExperienciasComponent } from './cargar-cv/experiencias/experiencias.component';
import { ReferenciasComponent } from './cargar-cv/referencias/referencias.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CargarCvComponent,
    PostulacionComponent,
    VerEmpleoComponent,
    ListarEmpleoComponent,
    ListarUsuarioComponent,
    ListarProcesoComponent,
    AgregarEmpleoComponent,
    EditarEmpleoComponent,
    EditarUsuarioComponent,
    AgregarUsuarioComponent,
    ConfiguracionComponent,
    DatosPersonalesComponent,
    EducacionComponent,
    IdiomasComponent,
    ExperienciasComponent,
    ReferenciasComponent],

  imports: [
    CommonModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    PagesRoutingModule
  ],
  providers: [
    HomePipe
  ]
})
export class PagesModule { }
