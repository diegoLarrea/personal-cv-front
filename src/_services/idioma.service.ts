import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Idioma } from 'src/_models/idioma';

@Injectable({
    providedIn: 'root'
})
export class IdiomaService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/idioma/`);
    }

    post(body:Idioma):Observable<any>{    
        return this.http.post(`${Host.api}/idioma/`, body);
    }

    put(body:Idioma):Observable<any>{    
        return this.http.put(`${Host.api}/idioma/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/idioma/${id}`);
    }
}