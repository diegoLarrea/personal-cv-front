import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Idioma } from 'src/_models/idioma';
import { IdiomaService } from 'src/_services/idioma.service';

declare var $:any;

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit {

  constructor(private apiIdioma: IdiomaService, 
    private ngxService: NgxUiLoaderService, 
    private dp: DatePipe,
    private toast: ToastrService) { }

  idioma: Idioma[] = [];
  ngOnInit(): void {
    this.get();
  }

  get(){
    this.apiIdioma.get().subscribe(
      data => {
        this.idioma = data;
        this.idioma.forEach(el => {
          el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, "dd/MM/yyyy HH:mm:ss");
        });
        this.idioma.unshift(new Idioma());
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
    idioma: "Idioma",
    habla: "Habla",
    lee: "Lee",
    escribe: "Escribe"
  }
  validateEducacion(obj: Idioma, ignore: string[]) {
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
    if(this.validateEducacion(this.idioma[targetPosition], ["id", "usuario", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Idioma = Object.assign({}, this.idioma[targetPosition]);
      delete obj.fecha_modificacion;
      this.apiIdioma.post(obj).subscribe(
        data => {
          this.get();
        }
      )
    }
  }

  loadingPut = false;
  put(targetPosition){
    if(this.validateEducacion(this.idioma[targetPosition], ["id", "usuario", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Idioma = Object.assign({}, this.idioma[targetPosition]);
      obj.usuario = obj.usuario.id;
      delete obj.fecha_modificacion;
      this.apiIdioma.put(obj).subscribe(
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
    this.apiIdioma.delete(this.idioma[this.deleteTargetPosition].id).subscribe(
      data => {
        this.ngxService.start();
        this.get();
      }
    )
  }

}
