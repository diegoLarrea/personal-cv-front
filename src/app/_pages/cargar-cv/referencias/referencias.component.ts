import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Referencia } from 'src/_models/referencia';
import { ReferenciaService } from 'src/_services/referencia.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss']
})
export class ReferenciasComponent implements OnInit {

  constructor(private apiRef: ReferenciaService, 
    private ngxService: NgxUiLoaderService, 
    private dp: DatePipe,
    private toast: ToastrService) { }

  referencia: Referencia[] = [];
  ngOnInit(): void {
    this.get();
  }

  get(){
    this.apiRef.get().subscribe(
      data => {
        this.referencia = data;
        this.referencia.forEach(el => {
          el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, "dd/MM/yyyy HH:mm:ss");
        });
        this.referencia.unshift(new Referencia());
        if(this.loadingPost || this.loadingPut || this.loadingDelete){
          this.ngxService.stop();
          this.loadingPost = false; 
          this.loadingPut = false;
          this.loadingDelete = false;
        }
      }
    )
  }

  eParser = {
    nombre: "Nombre",
    parentesco: "Parentesco",
    contacto: "Contacto"
  }
  validateRef(obj: Referencia, ignore: string[]) {
    for (let i in obj) {
      if (obj[i] == null && ignore.indexOf(i.toString()) < 0) {
        this.toast.error(`Complete ${this.eParser[i]}`);
        return false;
      }
    }
    return true;
  }

  loadingPost = false;
  post(targetPosition){
    if(this.validateRef(this.referencia[targetPosition], ["id", "usuario", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Referencia = Object.assign({}, this.referencia[targetPosition]);
      delete obj.fecha_modificacion;
      this.apiRef.post(obj).subscribe(
        data => {
          this.get();
        }
      )
    }
  }

  loadingPut = false;
  put(targetPosition){
    if(this.validateRef(this.referencia[targetPosition], ["id", "usuario", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Referencia = Object.assign({}, this.referencia[targetPosition]);
      obj.usuario = obj.usuario.id;
      delete obj.fecha_modificacion;
      this.apiRef.put(obj).subscribe(
        data => {
          this.get();
        }
      )
    }
  }

  loadingDelete = false;
  deleteTargetPosition = null;
  delete(){
    this.loadingDelete = true;
    this.ngxService.start();
    this.apiRef.delete(this.referencia[this.deleteTargetPosition].id).subscribe(
      data => {
        this.ngxService.start();
        this.get();
      }
    )
  }

}
