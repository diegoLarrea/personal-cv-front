import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mensaje = "Somos el servicio de telefonía móvil PERSONAL ofrecido en Paraguay por la empresa Núcleo S.A. operativa desde el 24 de junio de 1998. Te invitamos a que formes parte de este gran equipo de profesionales así, juntos, seguimos creciendo. Juntos hacemos +"
}
