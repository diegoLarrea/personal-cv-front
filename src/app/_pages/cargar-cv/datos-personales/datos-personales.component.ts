import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Persona } from 'src/_models/persona';
import { PersonaService } from 'src/_services/persona.service';
import { UtilsService } from 'src/_services/utils.service';

declare var $:any;
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  constructor(
    private apiUtils: UtilsService, 
    private apiPersona: PersonaService,
    private ngxService: NgxUiLoaderService,
    private toast: ToastrService
  ) { }

  ciudades = [];
  nacionalidades = [];
  persona: Persona = new Persona();

  ngOnInit(): void {
    this.getCiudades();
    this.getNacionalidades();
    this.getPersona();
    $('.collapse').collapse("hide");
    $('#btn-s-f').tooltip({ boundary: 'window' });
  }

  getCiudades(){
    this.apiUtils.getCiudades().subscribe(
      data => {
        this.ciudades = data;
      }
    )
  }

  getNacionalidades(){
    this.apiUtils.getNacionalidades().subscribe(
      data => {
        this.nacionalidades = data;
      }
    )
  }

  getPersona(){
    this.ngxService.start();
    this.apiPersona.getPersonaByUser().subscribe(
      data => {
        this.persona = data;
        if(this.persona.familiares != null){
          this.persona.familiares = JSON.parse(this.persona.familiares);
          this.rf = true;
          $("#showRf").collapse("show");
        }else{
          this.rf = false;
        }

        if(this.persona.ha_trabajado != null){
          this.rt = true;
          this.pt = JSON.parse(this.persona.ha_trabajado);
          $("#showRt").collapse("show");
        }else{
          this.rt = false; 
        }

        if(this.persona.redes_sociales != null){
          this.rs = JSON.parse(this.persona.redes_sociales);
        }
        
        if(this.persona.foto_perfil != null){
          setTimeout(()=>{$('#btn-e-f').tooltip({ boundary: 'window' });},0)
        }
        this.ngxService.stop();
      }
    )
  }

  // Familiares
  rf = false;
  familiares = [];

  changeRf(e){
    this.rf = e;
    if(this.rf){
      $("#showRf").collapse("show");
      this.persona.familiares = [{nombre:null}];
    }else{
      $("#showRf").collapse("hide");
      this.persona.familiares = null;
    }
  }

  addFamiliar(){
    let add = true;
    for(let i=0; i<this.persona.familiares.length; i++){
      if(this.persona.familiares[i].nombre == null || this.persona.familiares[i].nombre == ""){
        add = false;
        break;
      }
    }
    if(add)this.persona.familiares.push({nombre:null});
  }

  removeFamiliar(pos){
    if(this.persona.familiares.length > 1){
      this.persona.familiares.splice(pos,1);
    }
  }
  // redes sociales
  rs = {
    facebook: null,
    linkedin: null,
    twitter: null,
    web: null
  }

  // Ha trabajado
  rt = false;
  pt = {
    cargo: null,
    supervisor: null,
    donde: null
  }
  changeRt(e){
    this.rt = e;
    if(this.rt){
      $("#showRt").collapse("show");
    }else{
      $("#showRt").collapse("hide");
      this.pt.cargo = null;
      this.pt.supervisor = null;
      this.pt.donde = null;
    }
  }

  actualizarDatos(){
    let obj: Persona = Object.assign({}, this.persona);
    obj.usuario = obj.usuario.id;
    if(this.rt){
      obj.ha_trabajado = JSON.stringify(this.pt);
    }

    if(this.rs){
      obj.redes_sociales = JSON.stringify(this.rs);
    }

    if(this.rf){
      obj.familiares = JSON.stringify(obj.familiares);
    }else{
      obj.familiares = null;
    }
    
    if(this.validarPersona(obj, ["id", "fecha_creacion", "fecha_modificacion", "documento", 
    "cel_2", "telefono", "foto_perfil", "usuario", "familiares", "ha_trabajado", "redes_sociales"])){
      this.ngxService.start();
      this.apiPersona.putPersonaByUser(obj).subscribe(
        data => {
          this.ngxService.stop();
          this.toast.success("Datos actualizados");
        }
      )
    }
  }

  pParser = {
    nombres: "Nombres",
    apellidos: "Apellidos",
    sexo: "Sexo",
    nacionalidad: "Nacionalidad",
    estado_civil: "Estado civil",
    fecha_nacimiento: "Fecha de nacimiento",
    ciudad_residencia: "Cantidad de hijos",
    email: "Email",
    cel_1: "Celular"
  }

  validarPersona(obj: Persona, ignore: string[]) {
    for (let i in obj) {
      if (obj[i] == null && ignore.indexOf(i.toString()) < 0) {
        this.toast.error(`Complete ${this.pParser[i]}`);
        return false;
      }
    }

    if(!this.validarEmail(obj.email)){
      this.toast.error("Correo inválido");
      return false;
    }

    return true;
  }

  validarEmail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }

  // Foto de perfil
  profilePicker(){
    $("#foto-picker").trigger("click");
  }

  isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async profileHandler(files: FileList) {
    if (files != null && this.isFileImage(files.item(0))) {
      let file = files.item(0);
      let file64 = await this.toBase64(file);
      this.persona.foto_perfil = file64.toString();
    }
    $("#foto-picker").val(null);
  }
}
