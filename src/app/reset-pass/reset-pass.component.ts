import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { AuthService } from 'src/_services/auth';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  constructor(private toast: ToastrService, 
    private auth: AuthService, 
    private ngxService: NgxUiLoaderService, 
    private route: ActivatedRoute,
    private router: Router) { 
    route.queryParams.subscribe(
      params => {
        if(params["key"]){
          this.key = params["key"];
        }else{
          this.router.navigateByUrl("/login");
        }
      }
    )
  }

  ngOnInit(): void {
  }

  SPINNER = SPINNER;
  key = null;
  pass = null;
  repeatPass = null;

  reset(){
    this.ngxService.startLoader('rp-loader');
    if(this.pass == this.repeatPass && this.pass != null && this.pass != "" && this.pass.length > 5){
      this.auth.resetPass(this.key, this.pass).subscribe(
        data => {
          this.toast.success("Su contraseña ha sido cambiada");
          this.router.navigateByUrl("/login");
          this.ngxService.stopLoader('rp-loader');
        },error => {
          this.toast.error("El enlace ya expiró");
          this.ngxService.stopLoader('rp-loader');
        }
      )
    }else{
      this.toast.error("Las contraseñas no coinciden");
    }
  }
}
