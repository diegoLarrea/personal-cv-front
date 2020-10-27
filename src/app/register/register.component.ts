import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/_services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router) { }
  loading = false;
  captchaPass = false;
  obj = {
    username: null,
    password: null,
    nombres: null,
    apellidos: null,
    documento: null
  }

  ngOnInit(): void { }

  register(){
    let result = this.check();
    if(result){
      if(!this.captchaPass){
        this.toast.error("Resuelva la captcha");
        return;
      }
      this.loading = true;
      this.auth.register(this.obj).subscribe(
        data => {
          this.toast.success("Su cuenta ha sido registrada, se le envío un email de verificación a su correo electrónico");
          this.router.navigateByUrl('/login');
          this.loading = false;
        },
        error => {
          this.toast.error("El número de documento ya fue registrado");
          this.loading = false;
        }
      )
      console.log("OK");
    }
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
    this.auth.captcha({captcha:captchaResponse}).subscribe(
      data => {
        this.captchaPass = data.success;
        console.log(data.success);
      }
    )
    
  }

  parser = {
    username: "Correo electrónico",
    password: "Contraseña",
    nombres: "Nombres",
    apellidos: "Apellidos",
    documento: "Documento"
  }

  repeatPass = null;
  check(){
    for(let k in this.obj){
      if(this.obj[k] == null || this.obj[k] == ""){
        this.toast.error(`Complete ${this.parser[k]}`);
        return false;
      }
    }

    if(this.obj.password != this.repeatPass){
      this.toast.error("Las contraseñas no coinciden");
      return false;
    }

    if(this.obj.password.length < 6){
      this.toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if(!this.validarEmail(this.obj.username)){
      this.toast.error("Email inválido");
      return false;
    }
    
    return true;
  }

  validarEmail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }
}
