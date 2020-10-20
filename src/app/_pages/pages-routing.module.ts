import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AgregarEmpleoComponent } from './empleo/agregar-empleo/agregar-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo/editar-empleo.component';
import { ListarEmpleoComponent } from './empleo/listar-empleo/listar-empleo.component';
import { VerEmpleoComponent } from './empleo/ver-empleo/ver-empleo.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { ListarProcesoComponent } from './proceso/listar-proceso/listar-proceso.component';
import { AgregarUsuarioComponent } from './usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {path: "", redirectTo: "home", pathMatch: "full"},
      {
        path: "curriculum",
        component: CargarCvComponent
      },
      {
        path: "postulaciones",
        component: PostulacionComponent
      },
      {
        path: "procesos",
        component: ListarProcesoComponent
      },
      {
        path: "empleos",
        component: ListarEmpleoComponent
      },
      {
        path: "empleos/agregar",
        component: AgregarEmpleoComponent
      },
      {
        path: "empleos/ver/:id",
        component: VerEmpleoComponent
      },
      {
        path: "empleos/editar/:id",
        component: EditarEmpleoComponent
      },
      {
        path: "usuarios",
        component: ListarUsuarioComponent
      },
      {
        path: "usuarios/agregar",
        component: AgregarUsuarioComponent
      },
      {
        path: "usuarios/editar/:id",
        component: EditarUsuarioComponent
      },
      {
        path: "configuraciones",
        component: ConfiguracionComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
