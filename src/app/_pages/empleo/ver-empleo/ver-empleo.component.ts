import { Component, OnInit } from '@angular/core';
import { Empleo } from 'src/_models/empleo';
import { ActivatedRoute } from '@angular/router';
import Hashids from 'hashids';
import { EmpleoService } from 'src/_services/empleo.service';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/_services/auth';
import { PostulacionService } from 'src/_services/postulacion.service';

declare var $:any;
@Component({
  selector: 'app-ver-empleo',
  templateUrl: './ver-empleo.component.html',
  styleUrls: ['./ver-empleo.component.scss']
})
export class VerEmpleoComponent implements OnInit {

  idEmpleo = null;
  codigoEmpleo = null;
  vigente = null;
  loading = true;
  user = null;
  empleo: Empleo = new Empleo();
  hashids = new Hashids('personal-cv', 5);

  constructor(
    private activeRoute: ActivatedRoute, 
    private apiEmpleo: EmpleoService, 
    private dp: DatePipe,
    private ngxService: NgxUiLoaderService,
    private apiAuth: AuthService,
    private apiPostulacion: PostulacionService
  ) {
    this.codigoEmpleo = this.activeRoute.snapshot.paramMap.get('id');
    this.idEmpleo = this.hashids.decode(this.codigoEmpleo);
    this.getEmpleo();
  }

  ngOnInit(): void { }

  getEmpleo(){
    this.ngxService.start();
    this.loading = true;
    this.apiEmpleo.getEmpleo(this.idEmpleo).subscribe(
      data => { 
        this.vigente = data.vigente;
        delete data.vigente;
        this.empleo = data;
        this.empleo.vigencia = this.dp.transform(this.empleo.vigencia, "dd/MM/yyyy");
        console.log(this.empleo);
        this.loading = false;
        this.ngxService.stop();
      }
    )
  }

  openModalPostulacion(){
    this.user = this.apiAuth.getUser();
    if(this.user == null){
      $("#loginModal").modal("show");
    }else {
      $("#postulacionModal").modal("show");
      this.verificarUsuario();
    }
  }

  usuario_tiene_datos = false;
  verificarLoading = false;
  verificarUsuario(){
    this.usuario_tiene_datos = false;
    this.verificarLoading = true;
    this.apiPostulacion.verificarUsuario().subscribe(
      data => {
        this.usuario_tiene_datos = data.tiene_datos;
        this.verificarLoading = false;
      },
      error => {
        $("#postulacionModal").modal("hide");
        this.verificarLoading = false;
        this.usuario_tiene_datos = false;
      }
    )
  }
}
