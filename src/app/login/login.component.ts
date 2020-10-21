import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/_services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiAuth: AuthService, private toast: ToastrService, private router: Router) { }

  usuario = null;
  pass = null;
  loading = false;

  ngOnInit(): void {
  }

  login(){
    if(this.usuario != null && this.pass != null){
      this.loading = true;
      this.apiAuth.login(this.usuario, this.pass).subscribe(
        data => {
          localStorage.setItem('token', data.access);
          this.router.navigate([""]);
          this.loading = false;
        },
        error => {
          this.toast.info("Usuario y/o contraseña incorrecto/s");
        }
      )
    }else{
      this.toast.info("Complete los campos");
    }
    
  }
}
