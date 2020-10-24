import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Educacion } from 'src/_models/educacion';
import { EducacionService } from 'src/_services/educacion.service';

declare var $:any;
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  constructor(private apiEducacion: EducacionService, 
    private ngxService: NgxUiLoaderService, 
    private dp: DatePipe,
    private toast: ToastrService) { }

  educacion: Educacion[] = [];
  ngOnInit(): void {
    this.get();
  }

  get(){
    this.apiEducacion.get().subscribe(
      data => {
        this.educacion = data;
        this.educacion.forEach(el => {
          el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, "dd/MM/yyyy HH:mm:ss");
          if(el.documento != null){
            el.documento = JSON.parse(el.documento);
          }
        });
        this.educacion.unshift(new Educacion());
        if(this.loadingPost || this.loadingPut || this.loadingDelete){
          this.ngxService.stop();
          this.loadingPost = false; 
          this.loadingPut = false;
          this.loadingDelete = false;
        }
      }
    )
  }

  async fileHandler(files: FileList, targetPosition:number) {
    let file = files.item(0);
    if (files != null && this.isFileImageOrPdf(file) && file.size/(1024*1024) <= 2) {
      let file64 = await this.toBase64(file);
      this.educacion[targetPosition].documento = {archivo:file64.toString(), nombre:file.name};
    }else{
      this.toast.error("Tipo de archivo no permitido o excede límite permitido");
    }
    $(`#ifedu-${targetPosition}`).val(null)
  }

  isFileImageOrPdf(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'application/pdf'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  filePicker(pos){
    $(`#ifedu-${pos}`).trigger("click");
  }

  download(pos){
    var a = document.createElement("a");
    a.href = this.educacion[pos].documento.archivo;
    a.download = this.educacion[pos].documento.nombre;
    a.click();
  }

  eParser = {
    institucion: "Institución",
    titulo: "Título",
    grado: "Grado",
    pais: "País",
    desde: "Desde",
    estudiando: "¿Estudiando actualmente?"
  }
  validateEducacion(obj: Educacion, ignore: string[]) {
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
    if(this.validateEducacion(this.educacion[targetPosition], ["id", "usuario", "documento", "hasta", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Educacion = Object.assign({}, this.educacion[targetPosition]);
      if(obj.documento != null){
        obj.documento = JSON.stringify(obj.documento);
      }
      delete obj.fecha_modificacion;
      this.apiEducacion.post(obj).subscribe(
        data => {
          this.get();
        }
      )
    }
  }

  loadingPut = false;
  put(targetPosition){
    if(this.validateEducacion(this.educacion[targetPosition], ["id", "usuario", "documento", "hasta", "fecha_creacion", 
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Educacion = Object.assign({}, this.educacion[targetPosition]);
      obj.usuario = obj.usuario.id;
      delete obj.fecha_modificacion;
      if(obj.documento != null){
        obj.documento = JSON.stringify(obj.documento);
      }
      this.apiEducacion.put(obj).subscribe(
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
    this.apiEducacion.delete(this.educacion[this.deleteTargetPosition].id).subscribe(
      data => {
        this.ngxService.start();
        this.get();
      }
    )
  }
}
