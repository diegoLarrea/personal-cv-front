import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Router } from '@angular/router';
import { Persona } from 'src/_models/persona';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {
    constructor(private http: HttpClient) { }
    
    getPersonaByUser():Observable<any>{    
        return this.http.get(`${Host.api}/persona/`);
    }

    putPersonaByUser(body: Persona):Observable<any>{    
        return this.http.put(`${Host.api}/persona/`, body);
    }
}