import { Component, OnInit } from '@angular/core';
import { Empleo } from 'src/_models/empleo';
import { AuthService } from 'src/_services/auth';
import { EmpleoService } from 'src/_services/empleo.service';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  user = null;
  constructor(private apiAuth: AuthService) {
    this.user = apiAuth.getUser();
  }

  ngOnInit(): void { }

  f1() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  }

  f2() {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

  logOut(){
    this.apiAuth.logout();
    this.user = null;
  }
  
  sideBar = [
    {
      nombre: "Pág. Principal",
      active: false,
      perm: null,
      route: "/home",
      icon: "fas fa-home mr-2"
    },
    {
      nombre: "Currículum",
      active: false,
      perm: null,
      route: "/curriculum",
      icon: "fas fa-user-tie mr-2"
    },
    {
      nombre: "Postulaciones",
      active: false,
      perm: null,
      route: "/postulaciones",
      icon: "fas fa-star mr-2"
    },
    {
      nombre: "Procesos",
      active: false,
      perm: null,
      route: "/procesos",
      icon: "fas fa-clipboard-list mr-2"
    },
    {
      nombre: "Empleos",
      active: false,
      perm: null,
      route: "/empleos",
      icon: "fas fa-briefcase mr-2"
    },
    {
      nombre: "Usuarios",
      active: false,
      perm: null,
      route: "/usuarios",
      icon: "fas fa-users mr-2"
    },
    {
      nombre: "Configuraciones",
      active: false,
      perm: null,
      route: "/configuraciones",
      icon: "fas fa-cogs mr-2"
    }
  ]
}
