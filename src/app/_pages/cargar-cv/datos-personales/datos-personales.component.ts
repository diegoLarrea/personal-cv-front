import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#adicionales').collapse({
      toggle: false
    })
  }

}
