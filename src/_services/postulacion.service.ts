import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PostulacionService {
    constructor(private http: HttpClient) { }
    
    verificarUsuario():Observable<any>{    
        return this.http.get(`${Host.api}/usuario-verificar/`);
    }

}