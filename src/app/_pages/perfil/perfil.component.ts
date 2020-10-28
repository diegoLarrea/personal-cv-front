import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Persona } from 'src/_models/persona';
import { Usuario } from 'src/_models/usuario';
import { AuthService } from 'src/_services/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private auth: AuthService, 
    private dp: DatePipe, 
    private ngxService: NgxUiLoaderService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  loading = true;

  getUser(){
    this.loading = true;
    this.ngxService.start();
    this.auth.getCurrentUser().subscribe(
      data => {
        this.persona = data.persona;
        this.usuario = data.usuario;
        this.usuario.date_joined = this.dp.transform(this.usuario.date_joined, 'dd/MM/yyyy HH:mm:ss');
        this.usuario.last_login = this.dp.transform(this.usuario.last_login, 'dd/MM/yyyy HH:mm:ss');
        this.persona.fecha_nacimiento = this.dp.transform(this.persona.fecha_nacimiento, 'dd/MM/yyyy');
        this.loading = false;
        console.log(this.persona);
        console.log(this.usuario);
        this.ngxService.stop();
      }
    )
  }

  pass = null;
  new_pass = null;
  repeat_new_pass = null;

  cambiarPassword(){
    if(this.new_pass != null && this.new_pass != "" && this.pass != null 
    && this.pass != "" && this.repeat_new_pass != null && this.repeat_new_pass != ""){
      
      if(this.new_pass == this.repeat_new_pass){
        
        if(this.new_pass.length < 6){
          this.toast.error("Contraseña mínima de 6 caracteres");
          return;
        }

        this.ngxService.start();
        this.auth.cambiarPass(this.pass, this.new_pass).subscribe(
          data => {
            this.toast.success("La contraseña se cambió exitosamente");
            this.pass = null;
            this.new_pass = null;
            this.repeat_new_pass = null;
            this.ngxService.stop();
          },
          error => {
            this.toast.error("Contraseña actual incorrecta");
            this.ngxService.stop();
          }
        )

      }else{
        this.toast.error("La contraseña nueva no coincide");
      }
    }else{
      this.toast.error("Complete los campos");
    }
    
  }
}
