import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empleo } from 'src/_models/empleo';
import { EmpleoService } from 'src/_services/empleo.service';
import Hashids from 'hashids';
import { HomePipe } from './home.pipe';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiEmpleo: EmpleoService, 
    private dp: DatePipe, 
    private hp: HomePipe,
    private ngxService: NgxUiLoaderService
  ) { }

  empleos: Empleo [] = [];
  empleosCopy: Empleo [] = [];
  searchText = null;
  hashids = new Hashids('personal-cv', 5);
  p: number = 1;

  ngOnInit(): void {
    this.getEmpleos();
  }

  mensaje = "Somos el servicio de telefonía móvil PERSONAL ofrecido en Paraguay por la empresa Núcleo S.A. operativa desde el 24 de junio de 1998. Te invitamos a que formes parte de este gran equipo de profesionales así, juntos, seguimos creciendo. Juntos hacemos +"

  getEmpleos(){
    this.ngxService.start();
    this.apiEmpleo.getEmpleosHome().subscribe(
      data => {
        this.empleos = data;
        this.empleosCopy = [...this.empleos];
        this.empleos.forEach(el => {
          el.fecha_creacion = this.dp.transform(el.fecha_creacion, 'dd/MM/yyyy HH:mm:ss');
          el.id = this.hashids.encode(el.id);
        })
        console.log(this.empleos);
        this.ngxService.stop();
      }
    )
  }

  buscar(){
    if(this.searchText != null && this.searchText != ""){
      this.empleos = this.hp.transform(this.empleos, this.searchText);
    }
  }

  limpiar(){
    this.empleos = [...this.empleosCopy];
    this.searchText = null;
  }
}
