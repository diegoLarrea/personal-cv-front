import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Area } from 'src/_models/area';
import { AreaService } from 'src/_services/area.service';

declare var $:any;
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  areas: Area[] = [];
  p: number = 1;
  loading = true;

  constructor(private apiArea: AreaService, private ngxService: NgxUiLoaderService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiArea.get().subscribe(
      data => {
        this.areas = data;
        this.ngxService.stop();
        this.loading = false;
        console.log(this.areas);
      }
    )
  }

  areaAgregar: Area = new Area();
  areaAgregarLoading = false;
  post(){
    this.areaAgregarLoading = true;
    if(this.areaAgregar.nombre != null && this.areaAgregar.nombre != "" ){
      this.apiArea.post({nombre:this.areaAgregar.nombre}).subscribe(
        data => {
          this.areaAgregarLoading = false;
          $("#addAreaModal").modal("hide");
          this.areaAgregar = new Area();
          this.get();
        },
        error => {
          this.areaAgregarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete datos");
    }
  }


  areaEditar: Area = new Area();
  areaEditarLoading = false;
  openEditar(obj){
    this.areaEditar = Object.assign({}, obj);
  }
  put(){
    this.areaEditarLoading = true;
    if(this.areaEditar.nombre != null && this.areaEditar.nombre != ""){
      this.apiArea.put(this.areaEditar).subscribe(
        data => {
          this.areaEditarLoading = false;
          $("#editAreaModal").modal("hide");
          this.areaEditar = new Area();
          this.get();
        },
        error => {
          this.areaEditarLoading = false;
        }
      )
    }else{
      this.toast.error("Complete datos");
    }
  }

  areaEliminar: Area = new Area();
  areaEliminarLoading = false;
  openEliminar(obj){
    this.areaEliminar = Object.assign({}, obj);
  }
  delete(){
    this.areaEliminarLoading = true;
    this.apiArea.delete(this.areaEliminar.id).subscribe(
      data => {
        this.areaEliminarLoading = false;
        $("#deleteAreaModal").modal("hide");
        this.areaEliminar = new Area();
        this.get();
      },
      error => {
        this.areaEliminarLoading = false;
      }
    )
  }

}
