import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Localidad } from 'src/_models/localidad';
import { LocalidadService } from 'src/_services/localidad.service';

declare var $:any;
@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.scss']
})
export class LocalidadComponent implements OnInit {

  localidades: Localidad[] = [];
  p: number = 1;
  loading = true;

  constructor(private apiLocalidad: LocalidadService, private ngxService: NgxUiLoaderService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiLocalidad.get().subscribe(
      data => {
        this.localidades = data;
        this.ngxService.stop();
        this.loading = false;
        console.log(this.localidades);
      }
    )
  }

  localidadAgregar: Localidad = new Localidad();
  localidadAgregarLoading = false;
  post(){
    this.localidadAgregarLoading = true;
    if(this.localidadAgregar.nombre != null && this.localidadAgregar.nombre != "" &&
    this.localidadAgregar.direccion != null && this.localidadAgregar.direccion != ""){
      this.apiLocalidad.post({nombre:this.localidadAgregar.nombre,
      direccion: this.localidadAgregar.direccion}).subscribe(
        data => {
          this.localidadAgregarLoading = false;
          $("#addLocalidadModal").modal("hide");
          this.localidadAgregar = new Localidad();
          this.get();
        },
        error => {
          this.localidadAgregarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete datos");
    }
  }


  localidadEditar: Localidad = new Localidad();
  localidadEditarLoading = false;
  openEditar(obj){
    this.localidadEditar = Object.assign({}, obj);
  }
  put(){
    this.localidadEditarLoading = true;
    if(this.localidadEditar.nombre != null && this.localidadEditar.nombre != "" &&
    this.localidadEditar.direccion != null && this.localidadEditar.direccion != ""){
      this.apiLocalidad.put(this.localidadEditar).subscribe(
        data => {
          this.localidadEditarLoading = false;
          $("#editLocalidadModal").modal("hide");
          this.localidadEditar = new Localidad();
          this.get();
        },
        error => {
          this.localidadEditarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete datos");
    }
  }

  localidadEliminar: Localidad = new Localidad();
  localidadEliminarLoading = false;
  openEliminar(obj){
    this.localidadEliminar = Object.assign({}, obj);
  }
  delete(){
    this.localidadEliminarLoading = true;
    this.apiLocalidad.delete(this.localidadEliminar.id).subscribe(
      data => {
        this.localidadEliminarLoading = false;
        $("#deleteLocalidadModal").modal("hide");
        this.localidadEliminar = new Localidad();
        this.get();
      },
      error => {
        this.localidadEliminarLoading = false;
      }
    )
  }
}
