import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { AuthService } from 'src/_services/auth';
@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss']
})
export class ActivarCuentaComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService, 
    private toast: ToastrService, 
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) { 
      route.queryParams.subscribe(
        params => {
          if(params["key"]){
            this.key = params["key"];
            this.ngxService.startLoader('ac-loader');
            this.activar();
          }else{
            this.router.navigateByUrl("/login");
          }
        }
      )
    }

  key = null;
  SPINNER = SPINNER;
  ngOnInit(): void { }

  activar() {
    this.auth.activarCuenta(this.key).subscribe(
      data => {
        this.ngxService.stopLoader('ac-loader');
        this.router.navigateByUrl('/login');
        this.toast.success("La cuenta fue activada");
      }
    )
  }
}
