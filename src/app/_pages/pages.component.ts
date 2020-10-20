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
  
}
