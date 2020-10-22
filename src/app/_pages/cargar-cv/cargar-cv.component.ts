import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.scss']
})
export class CargarCvComponent implements OnInit {

  stepper = null;

  constructor() { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('.bs-stepper'), {
      linear: false
    });
  }

  next(){

  }
}
