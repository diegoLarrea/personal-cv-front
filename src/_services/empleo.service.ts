import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class EmpleoService {
    constructor(private http: HttpClient) { }
    
    getEmpleosHome():Observable<any>{    
        return this.http.get(`${Host.api}/p-empleo/`);
    }

}