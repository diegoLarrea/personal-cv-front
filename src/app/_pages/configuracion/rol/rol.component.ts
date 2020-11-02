import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Rol, Permiso } from 'src/_models/rol';
import { RolService } from 'src/_services/rol.service';

declare var $:any;
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  roles: Rol[] = [];
  p: number = 1;
  loading = true;

  constructor(private apiRol: RolService, private ngxService: NgxUiLoaderService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiRol.get().subscribe(
      data => {
        this.roles = data;
        this.ngxService.stop();
        this.loading = false;
        console.log(this.roles);
      }
    )
  }

  rolAgregar: string = null;
  rolAgregarLoading = false;
  post(){
    this.rolAgregarLoading = true;
    if(this.rolAgregar != null && this.rolAgregar != ""){
      this.apiRol.post({nombre:this.rolAgregar}).subscribe(
        data => {
          this.rolAgregarLoading = false;
          $("#addRolModal").modal("hide");
          this.rolAgregar = null;
          this.get();
        },
        error => {
          this.rolAgregarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete nombre");
    }
  }


  rolEditar: Rol = new Rol();
  rolEditarLoading = false;
  openEditar(obj){
    this.rolEditar = Object.assign({}, obj);
  }
  put(){
    this.rolEditarLoading = true;
    if(this.rolEditar.nombre != null && this.rolEditar.nombre != ""){
      this.apiRol.put(this.rolEditar).subscribe(
        data => {
          this.rolEditarLoading = false;
          $("#editRolModal").modal("hide");
          this.rolEditar = new Rol();
          this.get();
        },
        error => {
          this.rolEditarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete nombre");
    }
  }

  rolEliminar: Rol = new Rol();
  rolEliminarLoading = false;
  openEliminar(obj){
    this.rolEliminar = Object.assign({}, obj);
  }
  delete(){
    this.rolEliminarLoading = true;
    this.apiRol.delete(this.rolEliminar.id).subscribe(
      data => {
        this.rolEliminarLoading = false;
        $("#deleteRolModal").modal("hide");
        this.rolEliminar = new Rol();
        this.get();
      },
      error => {
        this.rolEliminarLoading = false;
      }
    )
  }

  rolPermisos: Rol = new Rol();
  rolPermisosLoading = false;
  permisos_asignados: any[] = [];
  permisos_disponibles: any[] = [];

  getPermisos(rol){
    this.rolPermisosLoading = true;
    this.permisos_asignados = [];
    this.permisos_disponibles = [];
    this.rolPermisos = Object.assign({}, rol);
    this.apiRol.permisos(rol.id).subscribe(
      data => {
        this.permisos_asignados = data.p_asignados;
        this.permisos_disponibles = data.p_disponibles;
        this.permisos_disponibles.forEach(el => {
          el["click"] = false;
        });
        this.permisos_asignados.forEach(el => {
          el["click"] = false;
        });
        this.rolPermisosLoading = false;
      },
      error => {
        this.rolPermisosLoading = false;
      }
    )
  }

  addPermiso(idPermiso){
    this.apiRol.addPermisos(this.rolPermisos.id, idPermiso).subscribe(
      data => {
        this.permisos_asignados = data.p_asignados;
        this.permisos_disponibles = data.p_disponibles;
        this.permisos_disponibles.forEach(el => {
          el["click"] = false;
        });
        this.permisos_asignados.forEach(el => {
          el["click"] = false;
        });
      }
    )
  }

  removePermiso(idPermiso){
    this.apiRol.removePermisos(this.rolPermisos.id, idPermiso).subscribe(
      data => {
        this.permisos_asignados = data.p_asignados;
        this.permisos_disponibles = data.p_disponibles;
        this.permisos_disponibles.forEach(el => {
          el["click"] = false;
        });
        this.permisos_asignados.forEach(el => {
          el["click"] = false;
        });
      }
    )
  }
}
