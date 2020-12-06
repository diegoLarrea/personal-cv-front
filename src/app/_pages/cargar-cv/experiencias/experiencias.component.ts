import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Experiencia } from 'src/_models/experiencia';
import { ExperienciaService } from 'src/_services/experiencia.service';

declare var $:any;
@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.scss']
})
export class ExperienciasComponent implements OnInit {

  constructor(private apiExperiencia: ExperienciaService, 
    private ngxService: NgxUiLoaderService, 
    private dp: DatePipe,
    private toast: ToastrService) { }

  experiencia: Experiencia[] = [];
  rubros = ["Rubro 1","Rubro 2","Rubro 3","Rubro 4","Rubro 5","Rubro 6","Rubro 7","Rubro 8","Rubro 9"];
  ngOnInit(): void {
    this.get();
  }

  get(){
    this.apiExperiencia.get().subscribe(
      data => {
        this.experiencia = data;
        this.experiencia.forEach(el => {
          el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, "dd/MM/yyyy HH:mm:ss");
          if(el.documento != null){
            el.documento = JSON.parse(el.documento);
          }
        });
        this.experiencia.unshift(new Experiencia());
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
      this.experiencia[targetPosition].documento = {archivo:file64.toString(), nombre:file.name};
    }else{
      this.toast.error("Tipo de archivo no permitido o excede límite permitido");
    }
    $(`#ifexp-${targetPosition}`).val(null)
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
    $(`#ifexp-${pos}`).trigger("click");
  }

  download(pos){
    var a = document.createElement("a");
    a.href = this.experiencia[pos].documento.archivo;
    a.download = this.experiencia[pos].documento.nombre;
    a.click();
  }

  eParser = {
    institucion: "Institución",
    puesto: "Puesto",
    rubro: "Rubro",
    desde: "Desde",
    trabajando: "¿Trabajando actualmente?",
    sup_nombre: "Superior Nombre",
    sup_puesto: "Superior Puesto",
    sup_contacto: "Superior Contacto"
  }
  validateExperiencia(obj: Experiencia, ignore: string[]) {
    for (let i in obj) {
      if (obj[i] == null && ignore.indexOf(i.toString()) < 0) {
        console.log(i);
        this.toast.error(`Complete ${this.eParser[i]}`);
        return false;
      }
    }
    return true;
  }

  loadingPost = false;
  post(targetPosition){
    if(this.validateExperiencia(this.experiencia[targetPosition], ["id", "usuario", "documento", "hasta", "fecha_creacion", "tareas",
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Experiencia = Object.assign({}, this.experiencia[targetPosition]);
      if(obj.documento != null){
        obj.documento = JSON.stringify(obj.documento);
      }
      delete obj.fecha_modificacion;
      this.apiExperiencia.post(obj).subscribe(
        data => {
          this.get();
        }
      )
    }
  }

  loadingPut = false;
  put(targetPosition){
    if(this.validateExperiencia(this.experiencia[targetPosition], ["id", "usuario", "documento", "hasta", "fecha_creacion", "tareas",
    "fecha_modificacion"])){
      this.loadingPost = true;
      this.ngxService.start();
      let obj: Experiencia = Object.assign({}, this.experiencia[targetPosition]);
      obj.usuario = obj.usuario.id;
      delete obj.fecha_modificacion;
      if(obj.documento != null){
        obj.documento = JSON.stringify(obj.documento);
      }
      this.apiExperiencia.put(obj).subscribe(
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
    this.apiExperiencia.delete(this.experiencia[this.deleteTargetPosition].id).subscribe(
      data => {
        this.ngxService.start();
        this.get();
      }
    )
  }

}
