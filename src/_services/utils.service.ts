import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor(private http: HttpClient) { }
    
    getCiudades():Observable<any>{
        return this.http.get('assets/json/ciudades.json');
    }

    getNacionalidades():Observable<any>{
        return this.http.get('assets/json/nacionalidades.json');
    }
}